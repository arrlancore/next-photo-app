import { usersRepo } from "@/lib/server";
import { userSchema } from "@/lib/server/schema";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  token: string;
  user: { name: string; email: string };
};

type RequestBody = {
  email: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { message: string }>
) {
  if (req.method === "POST") {
    try {
      const body: RequestBody = req.body;
      const validate = userSchema.login.validate(body);
      if (validate.error) throw validate.error.details[0].message;

      const data = await usersRepo.login(body);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error as string });
    }
  } else {
    res.status(405).json({ message: "not allowed" });
  }
}
