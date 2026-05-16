import express from "express";

import authMiddleware from "../middlewares/auth.middleware";

import upload from "../middlewares/multer.middleware";

import {
  uploadSalarySlip,
} from "../controllers/upload.controller";

const router = express.Router();

router.post(
  "/salary-slip/:loanId",
  authMiddleware,
  upload.single("salarySlip"),
  uploadSalarySlip
);

export default router;