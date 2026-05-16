import { Request, Response } from "express";

import Loan from "../models/loan.model";


// =====================================
// UPLOAD SALARY SLIP
// =====================================

export const uploadSalarySlip = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { loanId } = req.params;

    // file validation
    if (!req.file) {

      res.status(400).json({
        message: "No file uploaded",
      });

      return;
    }

    // find loan
    const loan = await Loan.findById(
      loanId
    );

    if (!loan) {

      res.status(404).json({
        message: "Loan not found",
      });

      return;
    }

    // security check
    if (
      loan.user.toString() !==
      req.user?._id.toString()
    ) {

      res.status(403).json({
        message: "Access denied",
      });

      return;
    }

    // save file path
    loan.salarySlip = req.file.path;

    await loan.save();

    res.status(200).json({

      message:
        "Salary slip uploaded successfully",

      filePath: req.file.path,

      loan,

    });

  } catch (error) {

    console.log(
      "Upload Error:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });

  }
};