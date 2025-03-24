import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, displayName, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  if (!email) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  if (!password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const newHashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    displayName,
    email,
    hashedPassword: newHashedPassword,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
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
    return res.status(401).json({ message: "wrong email or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  const { hashedPassword, ...detailWithoutPassword } = user.toObject();

  res.status(200).json(detailWithoutPassword);
};
export const logoutUser = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({ message: "Logout successuful" });
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Find user and handle case where user doesn't exist
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove sensitive information
    const { hashedPassword, ...detailWithoutPassword } = user.toObject();

    // Get follow counts
    const [followerCount, followingCount] = await Promise.all([
      Follow.countDocuments({ following: user._id }),
      Follow.countDocuments({ follower: user._id }),
    ]);

    const token = req.cookies.token;

    // If no token, return basic info
    if (!token) {
      return res.status(200).json({
        ...detailWithoutPassword,
        followerCount,
        followingCount,
        isFollowing: false,
      });
    }

    // If token exists, verify it
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(200).json({
          ...detailWithoutPassword,
          followerCount,
          followingCount,
          isFollowing: false,
        });
      }

      // Check if current user is following this user
      const isFollowing = await Follow.exists({
        follower: payload.userId,
        following: user._id,
      });

      return res.status(200).json({
        ...detailWithoutPassword,
        followerCount,
        followingCount,
        isFollowing: !!isFollowing,
      });
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { userId } = req;

    // Find user to follow
    const userToFollow = await User.findOne({ username });
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent self-following
    if (userToFollow._id.toString() === userId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    // Check existing follow status
    const existingFollow = await Follow.findOne({
      follower: userId,
      following: userToFollow._id,
    });

    let message;
    if (existingFollow) {
      await Follow.deleteOne({ _id: existingFollow._id });
      message = "Unfollowed successfully";
    } else {
      await Follow.create({ follower: userId, following: userToFollow._id });
      message = "Followed successfully";
    }

    // Get updated counts
    const [followerCount, followingCount] = await Promise.all([
      Follow.countDocuments({ following: userToFollow._id }),
      Follow.countDocuments({ follower: userToFollow._id }),
    ]);

    res.status(200).json({
      message,
      followerCount,
      followingCount,
      isFollowing: !existingFollow,
    });
  } catch (error) {
    console.error("Error in followUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
