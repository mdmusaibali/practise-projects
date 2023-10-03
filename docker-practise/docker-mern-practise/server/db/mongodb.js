const mongoose = require("mongoose");
mongoose
  .connect("mongodb://mongo:27017/test")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });
