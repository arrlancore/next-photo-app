import CommentInput from "@/components/comment-input";
import AppHeader from "@/components/header";
import UploadImage from "@/components/upload-image";
import UploadModal from "@/components/upload-modal";
import { usePhotos } from "@/features/photo/hook";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Avatar,
  CardHeader,
  CardBody,
  CardFooter,
  Card,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";

export default function Photos() {
  const { data: photos } = usePhotos();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [[blobPreview, file], setPreview] = useState<[string, File | null]>([
    "",
    null,
  ]);

  return (
    <Container maxW={"2xl"} pb="8">
      <AppHeader />
      <Divider />
      <Divider />
      <UploadImage
        onSelectImage={(file: File) => {
          const objectURL = URL.createObjectURL(file);
          setPreview([objectURL, file]);
          onOpen();
        }}
      />
      <UploadModal
        urlPreview={blobPreview}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={() => {}}
      />
      {/* <Stack as={Box}> */}
      {photos?.data.map((item) => (
        <Card key={item._id} w={"100%"} my="2">
          <CardHeader>
            <Flex spacing="2">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={item.createdBy.name} />
                <Box>
                  <Heading size="sm">{item.createdBy.name}</Heading>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
          <Image
            objectFit="contain"
            minH="280px"
            maxH="420px"
            src={item.photo}
            alt="Photo Item"
            background="#eee"
          />
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Accordion width="100%">
              <AccordionItem>
                <h2>
                  <AccordionButton px={0}>
                    <Box as="span" flex="1" textAlign="left">
                      {`Comments (${item.comments.length})`}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} px={0}>
                  <CommentInput />
                  {item.comments.map((commentObj) => (
                    <Flex
                      flex="1"
                      gap="2"
                      alignItems="center"
                      flexWrap="wrap"
                      mb="8"
                      key={commentObj._id}
                    >
                      <Avatar size="sm" name={commentObj.commentBy} />
                      <Box>
                        <Heading size="xs">{commentObj.commentBy}</Heading>
                      </Box>
                      <Text fontSize="sm">{commentObj.comment}</Text>
                    </Flex>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
      ))}
    </Container>
  );
}
