import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { f_userName, f_Pwd } = req.body;

    // Find the user by username
    const user = await User.findOne({ f_userName });
    if (!user) {
      res.status(404).json({ message: "Invalid username or password" });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Include f_userName in the response
    res.status(200).json({
      token,
      f_userName: user.f_userName, // Add username to the response
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

