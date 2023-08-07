import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "./db";

const { User, Photo } = db;

export const usersRepo = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const user = await User.findOne({ email });

    if (!(user && bcrypt.compareSync(password, user.hash))) {
      throw "Username or password is incorrect";
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return {
      user: user.toJSON(),
      token,
    };
  },
  register: async (params: {
    email: string;
    name: string;
    password: string;
  }) => {
    if (await User.findOne({ email: params.email })) {
      throw 'Email "' + params.email + '" is already registered';
    }

    const user = new User(params);

    if (params.password) {
      user.hash = bcrypt.hashSync(params.password, 10);
    }

    user.save();
  },
};

export const photosRepo = {
  post: async (params: { photo: string; createdBy: string }) => {
    const photo = new Photo(params);

    return photo.save();
  },
  getAll: async (params: {
    page: number;
    pageSize: number;
    sort: "asc" | "desc";
  }) => {
    const count = await Photo.count();
    const photos = await Photo.find()
      .limit(params.pageSize)
      .skip((params.page - 1) * params.pageSize)
      .sort({ _id: -1 })
      .populate([{ path: "createdBy", select: "name" }])
      .exec();

    return { data: photos, count };
  },
  comment: async ({
    comment,
    photo,
    user,
  }: {
    comment: string;
    photo: string;
    user: string;
  }) => {
    const userData = await User.findOne({ _id: user });
    return Photo.findByIdAndUpdate(
      photo,
      {
        $push: { comments: { comment, commentBy: userData.name } },
      },
      { new: true, useFindAndModify: false }
    );
  },
};
