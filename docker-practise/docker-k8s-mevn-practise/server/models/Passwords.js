const mongoose = require("mongoose");

const passwordsSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    // not expected in req.body
  },
  for: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Passwords = mongoose.model("Passwords", passwordsSchema);
module.exports = Passwords;
