import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function CommentInput() {
  const handleClick = () => console.log(1);

  return (
    <InputGroup size="md" mb="6">
      <Input pr="4.5rem" placeholder="type a comment.." />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" mr="1" onClick={handleClick}>
          Comment
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
