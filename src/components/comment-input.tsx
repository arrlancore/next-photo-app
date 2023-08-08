import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function CommentInput(props: {
  onComment: (comment: string) => void;
  id: string;
}) {
  return (
    <InputGroup size="md" mb="6">
      <Input id={props.id} pr="4.5rem" placeholder="type a comment.." />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          mr="1"
          onClick={() => {
            const comment = document.getElementById(
              props.id
            ) as HTMLInputElement;
            const tmp = comment.value;
            props.onComment(tmp);
            // clearing
            comment.value = "";
          }}
        >
          Comment
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
