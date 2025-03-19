import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { username, displayName, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const newHashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    displayName,
    email,
    hashedPassword: newHashedPassword,
  });

  const { hashedPassword, ...detailWithoutPassword } = user.toObject();

  res.status(201).json(detailWithoutPassword);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "wrong email or password" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "wrong email or password" });
  }

  const { hashedPassword, ...detailWithoutPassword } = user.toObject();

  res.status(200).json(detailWithoutPassword);
};
export const logoutUser = async (req, res) => {};

export const getUser = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  const { hashedPassword, ...detailWithoutPassword } = user.toObject();

  res.status(200).json(detailWithoutPassword);
};
