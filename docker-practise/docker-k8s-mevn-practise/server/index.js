require("./db/mongo");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

//routes
const userRoute = require("./routes/user");
app.use(userRoute);

const passwordsRoute = require("./routes/passwords");
app.use(passwordsRoute);

app.listen(3001, () => {
  console.log("Listening at 3001");
});
