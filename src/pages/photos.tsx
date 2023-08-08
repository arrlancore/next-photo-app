import CommentInput from "@/components/comment-input";
import AppHeader from "@/components/header";
import UploadImage from "@/components/upload-image";
import UploadModal from "@/components/upload-modal";
import {
  useCommentPhoto,
  usePhotos,
  useUploadPhoto,
} from "@/features/photo/hook";
import { renderIf } from "@/lib/render";
import {
  Box,
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
  Spinner,
} from "@chakra-ui/react";

import { useState } from "react";

export default function Photos() {
  const pageSize = 20;
  const [page] = useState(1);
  const { data: photos, isLoading } = usePhotos({ page, pageSize });
  const { mutate: commentPhoto } = useCommentPhoto();
  const { mutate: uploadPhoto, isLoading: loadingUploadPhoto } =
    useUploadPhoto();
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
        isLoading={loadingUploadPhoto}
        onSubmit={() => {
          const form = new FormData();
          form.append("photo", file as Blob);

          uploadPhoto(form, {
            onSuccess: () => {
              onClose();
              setPreview(["", null]);
            },
          });
        }}
      />
      {renderIf(isLoading)(
        <Flex p="16" alignItems="center" justify="center">
          <Spinner />
        </Flex>
      )}

      {renderIf(photos?.data?.length === 0)(
        <Flex p="16" alignItems="center" justify="center">
          No photo to show, please upload your photo!
        </Flex>
      )}
      {photos?.data?.map((item) => (
        <Card key={item._id} w={"100%"} my="2">
          <CardHeader>
            <Flex gap="2">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={item.createdBy.name} />
                <Box>
                  <Heading size="sm">{item.createdBy.name}</Heading>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
          <Image
            objectFit="cover"
            minH="280px"
            h="420px"
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
                  <CommentInput
                    id={item._id}
                    onComment={(c: string) => {
                      commentPhoto({ comment: c, photoId: item._id });
                    }}
                  />
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
