const jwt = require("jsonwebtoken");
const User = require("./../models/User");

const auth = async (req, res, next) => {
  const authorization = req.header("Authorization");
  try {
    if (!authorization) {
      throw new Error("Authorization needed");
    }
    const userToken = authorization.replace("Bearer ", "");
    if (!userToken || !(typeof userToken === "string")) {
      throw new Error("Authorization needed");
    }
    const decoded = jwt.verify(userToken, "someSecret");
    const user = await User.findOne({
      _id: decoded._id,
      tokens: userToken,
    });
    if (!user) {
      throw new Error("Please authenticate");
    }
    req.user = user;
    req.token = userToken;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      const userToken = authorization.replace("Bearer ", "");
      const user = await User.findOne({
        tokens: userToken,
        active: true,
      });
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "Token expired" });
      }
      user.tokens = user.tokens.filter((token) => token !== userToken);
      await user.save();
      return res.status(401).send({ success: false, message: "Token expired" });
    }
    return res.status(401).send({ success: false, message: error.message });
  }
};
module.exports = auth;
