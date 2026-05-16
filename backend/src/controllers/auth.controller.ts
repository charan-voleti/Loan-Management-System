import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.model";
import generateToken from "../utils/jwt";


// =======================
// SIGNUP
// =======================

export const signup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      fullName,
      email,
      password,
      role,
    } = req.body;

    // check required fields
    if (!fullName || !email || !password) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }

    // check existing user
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || "BORROWER",
    });

    // generate token
    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("Signup Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// =======================
// LOGIN
// =======================

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // validate fields
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password required",
      });

      return;
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Invalid credentials",
      });

      return;
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      res.status(400).json({
        message: "Invalid credentials",
      });

      return;
    }

    // generate token
    const token = generateToken(user._id.toString());

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};