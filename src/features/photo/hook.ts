import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GetPhotosRequest,
  GetPhotosResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  getPhotos,
  login,
  register,
} from "./service";
import { useToast } from "@chakra-ui/react";

export const usePhotos = (options: GetPhotosRequest) => {
  const toast = useToast();

  return useQuery<GetPhotosResponse, Error>({
    queryKey: ["usePhotos", options],
    queryFn: () => getPhotos(options),

    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
};

export const useRegister = () => {
  const toast = useToast();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (payload: { email: string; password: string; name: string }) =>
      register(payload),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "New account has been created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        title: "Login failed",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
};
