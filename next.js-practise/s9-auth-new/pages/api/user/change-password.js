import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/lib/db";
import { User } from "@/model/User";

export default async (req, res) => {
  try {
    if (req.method !== "PATCH") {
      return;
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).send({ message: "Not authenticated!" });
    }
    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    await dbConnect();
    const user = await User.findByCredentials(userEmail, oldPassword);
    user.password = newPassword;
    await user.save();
    res.send({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error?.message || "Something went wrong.",
    });
  }
};
