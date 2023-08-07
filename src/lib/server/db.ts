import mongoose from "mongoose";
import { photoSchema, userSchema } from "./db-schema";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const db = {
  User: userModel(),
  Photo: photoModel(),
};

// mongoose models with schema definitions

function userModel() {
  return mongoose.models.User || mongoose.model("User", userSchema);
}

function photoModel() {
  return mongoose.models.Photo || mongoose.model("Photo", photoSchema);
}
