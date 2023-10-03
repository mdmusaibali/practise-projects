const express = require("express");
const auth = require("../middleware/auth");
const Passwords = require("./../models/Passwords");
const router = express.Router();

router.get("/api/user/passwords", auth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const userAfterPopulation = await user.populate({
      path: "passwords",
    });
    res.send({ success: true, passwords: userAfterPopulation.passwords });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.post("/api/user/password", auth, async (req, res) => {
  try {
    const user = req.user;
    const password = new Passwords({
      owner: user._id,
      for: req.body.for,
      value: req.body.value,
    });
    await password.save();
    res.send({ success: true, password });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;
