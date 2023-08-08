import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CommentPhotoRequest,
  CommentPhotoResponse,
  GetPhotosRequest,
  GetPhotosResponse,
  LoginRequest,
  LoginResponse,
  PhotoResponse,
  RegisterRequest,
  RegisterResponse,
  UploadPhotoRequest,
  UploadPhotoResponse,
  commentPhoto,
  getPhotos,
  login,
  register,
  uploadPhoto,
} from "./service";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const usePhotos = (options: GetPhotosRequest) => {
  const toast = useToast();

  return useQuery<GetPhotosResponse, Error>({
    queryKey: ["photos"],
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

export const useUploadPhoto = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const username = useUserName();

  return useMutation<UploadPhotoResponse, Error, UploadPhotoRequest>({
    mutationFn: (payload: FormData) => uploadPhoto(payload),
    onMutate: async (newPhoto) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["photos"] });

      // Snapshot the previous value
      const previous = queryClient.getQueryData(["photos"]);

      // Optimistically update to the new value
      const photoUrlBlob = URL.createObjectURL(newPhoto.get("photo") as Blob);
      const newItem: PhotoResponse = {
        _id: Date.now().toString(),
        photo: photoUrlBlob,
        createdBy: {
          name: username,
        },
        comments: [],
      };
      queryClient.setQueryData(["photos"], (old: any) => {
        old.count = old.count + 1;
        old.data = [newItem, ...old.data];

        return old;
      });

      // Return a context object with the snapshotted value
      return { previous };
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "New photo has been uploaded",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        title: "Upload photo failed",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
};

export const useCommentPhoto = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const username = useUserName();

  return useMutation<CommentPhotoResponse, Error, CommentPhotoRequest>({
    mutationFn: (payload: CommentPhotoRequest) => commentPhoto(payload),
    onMutate: async (newComment) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["photos"] });

      // Snapshot the previous value
      const previous = queryClient.getQueryData(["photos"]);

      // Fail first if no comment
      if (!newComment.comment) {
        return { previous };
      }
      // Optimistically update to the new value
      queryClient.setQueryData(["photos"], (old: any) => {
        old.data = (old.data as PhotoResponse[]).map((item) => {
          if (item._id === newComment.photoId) {
            item.comments = [
              {
                comment: newComment.comment,
                commentBy: username,
                _id: Date.now().toString(),
              },
              ...item.comments,
            ];
          }

          return item;
        });

        return old;
      });

      // Return a context object with the snapshotted value
      return { previous };
    },

    onError: (err) => {
      toast({
        title: "Commenting to photo failed",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
};

export const useUserName = () => {
  const [name, setName] = useState("unknown name");
  useEffect(() => {
    const name = String(localStorage.getItem("user_name")) || "unknown name";
    setName(name);
  }, []);

  return name;
};
