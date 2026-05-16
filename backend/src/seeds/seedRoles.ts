import mongoose from "mongoose";

import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import User from "../models/user.model";

dotenv.config();


// ======================================
// MONGO CONNECTION
// ======================================

const connectDB = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI as string
    );

    console.log(
      "MongoDB Connected"
    );

  } catch (error) {

    console.log(
      "DB Connection Error:",
      error
    );

    process.exit(1);
  }
};


// ======================================
// USERS
// ======================================

const users = [

  {
    fullName: "Admin User",
    email: "admin@test.com",
    password: "123456",
    role: "ADMIN",
  },

  {
    fullName: "Sales User",
    email: "sales@test.com",
    password: "123456",
    role: "SALES",
  },

  {
    fullName: "Sanction Officer",
    email: "sanction@test.com",
    password: "123456",
    role: "SANCTION",
  },

  {
    fullName: "Disbursement Officer",
    email: "disbursement@test.com",
    password: "123456",
    role: "DISBURSEMENT",
  },

  {
    fullName: "Collection Officer",
    email: "collection@test.com",
    password: "123456",
    role: "COLLECTION",
  },

  {
    fullName: "Borrower User",
    email: "borrower@test.com",
    password: "123456",
    role: "BORROWER",
  },
];


// ======================================
// SEED FUNCTION
// ======================================

const seedUsers = async () => {

  try {

    await connectDB();

    // clear old users
    await User.deleteMany();

    console.log(
      "Old users deleted"
    );

    // insert users
    for (const user of users) {

      const hashedPassword =
        await bcrypt.hash(
          user.password,
          10
        );

      await User.create({

        fullName: user.fullName,

        email: user.email,

        password: hashedPassword,

        role: user.role,
      });
    }

    console.log(
      "Users seeded successfully"
    );

    process.exit();

  } catch (error) {

    console.log(
      "Seed Error:",
      error
    );

    process.exit(1);

  }
};

seedUsers();