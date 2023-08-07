import { useMutation } from "@tanstack/react-query";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  login,
  register,
} from "./service";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const useLogin = () => {
  const toast = useToast();
  const router = useRouter();
  const { query } = router;

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (payload: { email: string; password: string }) =>
      login(payload),

    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_name", data.user.name);

      router.replace(String(query.returnUrl) || "/photos");
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
