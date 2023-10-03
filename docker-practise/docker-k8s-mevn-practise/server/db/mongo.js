const mongoose = require("mongoose");

mongoose
  .connect("mongodb://mongo-cluster-ip-service:27017/musaib")
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch((err) => {
    console.log("ERROR ", err);
  });
