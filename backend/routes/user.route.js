import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/create", async (req, res) => {
  const userInfo = req.body;

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await User.create({
    displayName: req.body.displayName,
    userName: req.body.userName,
    email: req.body.email,
    hashedPassword: hashedPassword,
  });

  res.json("user created");
});

router.delete("/", async (req, res) => {
  const deleteUser = await User.deleteOne({ userName: "test" });

  res.json(deleteUser);
});
export default router;
