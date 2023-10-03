import dbConnect from "@/lib/db";
import { User } from "@/model/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  try {
    const data = req.body;
    const { email, password } = data;
    console.log(email, password);
    await dbConnect();
    const user = new User({ email, password });
    await user.save();
    res.send({ success: true, user });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error?.message || "Something went wrong.",
    });
  }
}
