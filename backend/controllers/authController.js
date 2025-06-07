import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationCode } from "../Utils/mailer.js"; 

export const register = async (req, res) => {
  try {
    const { name , email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name, email, password: hashedPassword, verificationCode ,codeExpiresAt });
    await newUser.save();


    await sendVerificationCode(email, verificationCode);
    res.status(201).json({ message: "Verification code sent", userId: newUser._id, email: newUser.email  });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", err });
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { userId, code } = req.body;
    const user = await User.findById(userId);

    if (!user || user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid code" });
    if (new Date() > user.codeExpiresAt) {
  return res.status(400).json({ success: false, message: "OTP expired" });
}
 user.isVerified = true;
    user.verificationCode = null;
   
    await user.save();

    // Optional: Issue token if you want to log them in directly
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ message: "Verified successfully", token, success: true,});
  } catch (err) {
    res.status(500).json({ message: "Code verification failed", err });
  }
};

export const resendCode = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationCode = verificationCode;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendVerificationCode(user.email, verificationCode);

    res.json({ success: true, message: "OTP resent" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to resend OTP", err });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your email first." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, userId:user._id,userEmail:user.email,userName:user.name ,isVerified:user.isVerified});
  } catch (err) {
    res.status(500).json({ message: "Login failed", err });
  }
};
