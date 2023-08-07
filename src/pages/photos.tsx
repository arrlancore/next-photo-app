import CommentInput from "@/components/comment-input";
import AppHeader from "@/components/header";
import UploadImage from "@/components/upload-image";
import UploadModal from "@/components/upload-modal";
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
      <Card w={"100%"} my="2">
        <CardHeader>
          <Flex spacing="2">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" />
              <Box>
                <Heading size="sm">Segun Adebayo</Heading>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <Image
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
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
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {"Comments (0)"}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <CommentInput />
                <Flex
                  flex="1"
                  gap="2"
                  alignItems="center"
                  flexWrap="wrap"
                  mb="8"
                >
                  <Avatar size="sm" name="Segun Adebayo" />
                  <Box>
                    <Heading size="xs">Segun Adebayo</Heading>
                  </Box>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Flex>
                <Flex
                  flex="1"
                  gap="2"
                  alignItems="center"
                  flexWrap="wrap"
                  mb="4"
                >
                  <Avatar size="sm" name="Segun Adebayo" />
                  <Box>
                    <Heading size="xs">Segun Adebayo</Heading>
                  </Box>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>

      <Card w={"100%"} mt="2">
        <CardHeader>
          <Flex spacing="2">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" />
              <Box>
                <Heading size="sm">Segun Adebayo</Heading>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <Image
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
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
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {"Comments (0)"}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex
                  flex="1"
                  gap="2"
                  alignItems="center"
                  flexWrap="wrap"
                  mb="8"
                >
                  <Avatar size="sm" name="Segun Adebayo" />
                  <Box>
                    <Heading size="xs">Segun Adebayo</Heading>
                  </Box>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Flex>
                <Flex
                  flex="1"
                  gap="2"
                  alignItems="center"
                  flexWrap="wrap"
                  mb="4"
                >
                  <Avatar size="sm" name="Segun Adebayo" />
                  <Box>
                    <Heading size="xs">Segun Adebayo</Heading>
                  </Box>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>
      {/* </Stack> */}
    </Container>
  );
}
