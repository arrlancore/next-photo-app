import joi from "joi";

export const userSchema = {
  register: joi.object({
    email: joi.string().email().min(3).max(30).required(),
    name: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().min(6).max(30).required(),
  }),

  login: joi.object({
    email: joi.string().email().min(3).max(30).required(),
    password: joi.string().min(6).max(30).required(),
  }),
};

export const photoSchema = {
  photoComment: joi.object({
    comment: joi.string().min(1).required(),
    user: joi.string().min(1).required(),
    photo: joi.string().required(),
  }),
};
