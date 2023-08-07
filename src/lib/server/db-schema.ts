import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  }
);
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

export const photoSchema = new Schema(
  {
    photo: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [
      {
        comment: { type: String, required: true },
        commentBy: { type: String, required: true },
      },
    ],
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  }
);
