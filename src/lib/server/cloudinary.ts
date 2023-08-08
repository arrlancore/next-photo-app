import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "kodekoki",
  api_key: "616381933643464",
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary;
