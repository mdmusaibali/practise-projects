import dbConnect from "@/lib/db";
import { compare, hash } from "bcryptjs";
import { Schema, model, models } from "mongoose";

const userSchema = Schema({
  email: {
    type: String,
    required: [true, "Please provide an email."],
    trim: true,
    unique: [true, "This email is already in use."],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await hash(user.password, 8);
    next();
  }
});

userSchema.statics.findByCredentials = async function (email, password) {
  await dbConnect();
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    throw new Error("Email does not exist.");
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect credentials!");
  }
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

export const User = models.User || model("User", userSchema);
