import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../utils/email.js";

export const signup = async (req, res) => {
  const {
    fullname,
    email,
    password,
    dob,
    address,
    maritalStatus,
    nextOfKin,
  } = req.body;

  // Validate required fields
  if (
    !fullname ||
    !email ||
    !password ||
    !dob ||
    !address ||
    !maritalStatus ||
    !nextOfKin?.fullname ||
    !nextOfKin?.relationship ||
    !nextOfKin?.phone ||
    !nextOfKin?.address
  ) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Create new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      dob,
      address,
      maritalStatus,
      nextOfKin,
      verificationToken,
      role: "user", // hardcoded or dynamic based on need
    });

    await newUser.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res
        .status(403)
        .json({ message: "Please verify your email first." });

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send reset password email
    await sendResetPasswordEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing request", error: error.message });
  }
};
