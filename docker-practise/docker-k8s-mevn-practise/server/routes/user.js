const express = require("express");
const auth = require("../middleware/auth");
const User = require("./../models/User");
const router = express.Router();

router.post("/api/signUp", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const user = new User({ username, email, password });
    const token = await user.appendNewAuthToken();
    await user.save();
    res.send({ success: true, user, token });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.post("/api/user/login", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new Error("No credentials provided");
    }
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.appendNewAuthToken();
    res.send({ success: true, user, token });
  } catch (error) {
    console.log("ERROR---------------------------", error);
    res.status(400).send({ success: false, message: error.message });
  }
});

router.post("/api/user/me", auth, async (req, res) => {
  try {
    const user = req.user;
    res.send({ success: true, user });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;
