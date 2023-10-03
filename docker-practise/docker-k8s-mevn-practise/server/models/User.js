const mongoose = require("mongoose");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
});

userSchema.virtual("passwords", {
  ref: "Passwords",
  localField: "_id",
  foreignField: "owner",
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await crypt.hash(user.password, 8);
    next();
  }
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.appendNewAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "someSecret", {
    expiresIn: "1 day",
  });
  user.tokens = user.tokens.concat(token);
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async function (username, password) {
  let user;
  user = await User.findOne({ username: username });

  if (!user) {
    throw new Error("Username does not exist.");
  }
  const isMatch = await crypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect credentials!");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
