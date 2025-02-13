import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import chalk from "chalk";

// User Registration
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { username, password } = req.body;

  try {
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(chalk.red("❌ Error registering user:", error.message));
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
const loginUser = async (req, res) => {
  let { username, password } = req.body;

  try {
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error(
        chalk.red("❌ JWT_SECRET is missing from environment variables.")
      );
      return res
        .status(500)
        .json({ message: "Server error: Missing secret key" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(chalk.red("❌ Error logging in user:", error.message));
    res.status(500).json({ message: "Server error" });
  }
};

// Middleware: Verify JWT Token
const verifyUser = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const cleanToken = token.replace("Bearer ", "").trim();

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error(
        chalk.red("❌ JWT_SECRET is missing from environment variables.")
      );
      return res
        .status(500)
        .json({ message: "Server error: Missing secret key" });
    }

    const verified = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = verified; // Attach user details to the request
    next();
  } catch (error) {
    console.error(chalk.red("❌ Invalid token:", error.message));
    res.status(401).json({ message: "Invalid token" });
  }
};

export { registerUser, loginUser, verifyUser };
