import axios from "axios";

axios.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("auth_token");

  config.headers.Authorization = jwt ? "Bearer " + jwt : undefined;

  return config;
});

export type PhotoResponse = {
  _id: string;
  photo: string;
  createdBy: {
    name: string;
  };
  comments: Array<{ comment: string; commentBy: string; _id: string }>;
};

export type GetPhotosRequest = { page: number; pageSize: number };
export type GetPhotosResponse = {
  count: number;
  data: Array<PhotoResponse>;
};

export async function getPhotos(payload: GetPhotosRequest) {
  try {
    const res = await axios.get<GetPhotosResponse>("/api/photos", {
      params: payload,
    });

    if (res.status !== 200) {
      throw res.data;
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export type UploadPhotoRequest = FormData;
export type UploadPhotoResponse = PhotoResponse;

export async function uploadPhoto(payload: FormData) {
  try {
    const res = await axios.post<UploadPhotoResponse>("/api/photos", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status !== 200) {
      throw res.data;
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export type CommentPhotoRequest = { comment: string; photoId: string };
export type CommentPhotoResponse = PhotoResponse;

export async function commentPhoto(payload: CommentPhotoRequest) {
  try {
    const res = await axios.post<UploadPhotoResponse>(
      `/api/photos/${payload.photoId}/comment`,
      payload
    );

    if (res.status !== 200) {
      throw res.data;
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
