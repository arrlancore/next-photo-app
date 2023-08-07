import axios from "axios";

export type LoginRequest = { email: string; password: string };
export type LoginResponse = {
  token: string;
  user: {
    name: string;
  };
};

export async function login(payload: LoginRequest) {
  try {
    const res = await axios.post<LoginResponse>("/api/login", payload);

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

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};
export type RegisterResponse = null;

export async function register<RegisterResponse>(payload: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const res = await axios.post("/api/register", payload);

    if (res.status !== 201) {
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
