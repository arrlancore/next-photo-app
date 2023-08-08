import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  // useDisclosure,
} from "@chakra-ui/react";

export default function UploadModal({
  isOpen,
  onClose,
  urlPreview,
  onSubmit,
  isLoading,
}: {
  isOpen: boolean;
  isLoading: boolean;
  urlPreview: string;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a new photo?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image objectFit="cover" src={urlPreview} alt="Photo Preview" />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              mr={3}
              onClick={onSubmit}
            >
              Continue
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
