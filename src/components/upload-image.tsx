import { Button, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function UploadImage(props: {
  onSelectImage: (f: File) => void;
}) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [blobPreview, setBlobPreview] = useState("");

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current?.click();
  };

  const handleFileChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj =
      target &&
      (target as HTMLInputElement).files &&
      (target as HTMLInputElement).files![0];
    if (!fileObj) {
      return;
    }

    // 👇️ reset file input
    (target as HTMLInputElement).value = "";

    props.onSelectImage(fileObj);
  };
  return (
    <Flex h="100px" bg="white" justifyContent="center" alignItems="center">
      <input
        style={{ display: "none" }}
        ref={inputRef as any}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e)}
      />
      <Button
        px={4}
        fontSize={"sm"}
        rounded={"full"}
        onClick={handleClick}
        bg={"blue.400"}
        color={"white"}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        _hover={{
          bg: "blue.500",
        }}
        _focus={{
          bg: "blue.500",
        }}
      >
        Upload Image
      </Button>
    </Flex>
  );
}
