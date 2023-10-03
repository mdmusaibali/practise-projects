const express = require("express");
const cors = require("cors");
const app = express();

const User = require("./models/User");

app.use(express.json());
app.use(cors());

require("./db/mongodb");

app.get("/", (req, res) => {
  res.send("HI There");
});

app.post("/user", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) throw new Error("Please provide name and email");
    const user = new User({ name, email });
    await user.save();
    res.send({ success: true, user });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

app.get("/users", async (_, res) => {
  try {
    const users = await User.find({});
    res.send({ success: true, users });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

app.listen(3001, () => {
  console.log("Listening at 3001");
});
