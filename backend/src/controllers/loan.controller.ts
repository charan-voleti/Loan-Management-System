import { Request, Response } from "express";

import Loan from "../models/loan.model";

import runBRE from "../services/bre.service";

import calculateLoan from "../utils/loanCalculator";

import {
  AuthRequest,
} from "../middlewares/auth.middleware";

import {
  LoanStatus,
} from "../utils/constants";


// ======================================
// APPLY LOAN
// ======================================

export const applyLoan = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const {
      fullName,
      panNumber,
      dateOfBirth,
      monthlySalary,
      employmentStatus,
      loanAmount,
      tenureDays,
    } = req.body;


    // =========================
    // REQUIRED FIELD CHECK
    // =========================

    if (
      !fullName ||
      !panNumber ||
      !dateOfBirth ||
      !monthlySalary ||
      !employmentStatus ||
      !loanAmount ||
      !tenureDays
    ) {

      res.status(400).json({
        message: "All fields are required",
      });

      return;
    }


    // =========================
    // BRE VALIDATION
    // =========================

    const breResult = runBRE({
      dateOfBirth,
      monthlySalary,
      employmentStatus,
      panNumber,
    });


    if (!breResult.passed) {

      res.status(400).json({
        message: breResult.reason,
      });

      return;
    }


    // =========================
    // LOAN LIMIT VALIDATION
    // =========================

    if (
      loanAmount < 50000 ||
      loanAmount > 500000
    ) {

      res.status(400).json({
        message:
          "Loan amount must be between 50K and 5L",
      });

      return;
    }


    // =========================
    // TENURE VALIDATION
    // =========================

    if (
      tenureDays < 30 ||
      tenureDays > 365
    ) {

      res.status(400).json({
        message:
          "Tenure must be between 30 and 365 days",
      });

      return;
    }


    // =========================
    // LOAN CALCULATION
    // =========================

    const {
      interest,
      totalRepayment,
    } = calculateLoan(
      loanAmount,
      12,
      tenureDays
    );


    // =========================
    // CREATE LOAN
    // =========================

    const loan = await Loan.create({

      user: req.user?._id,

      fullName,

      panNumber,

      dateOfBirth,

      monthlySalary,

      employmentStatus,

      loanAmount,

      tenureDays,

      interestRate: 12,

      interestAmount: interest,

      totalRepayment,

      outstandingAmount:
        totalRepayment,

      status: LoanStatus.APPLIED,
    });


    // =========================
    // RESPONSE
    // =========================

    res.status(201).json({

      message:
        "Loan application submitted successfully",

      loan,
    });

  } catch (error) {

    console.log(
      "Apply Loan Error:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ======================================
// SANCTION LOAN
// ======================================

export const sanctionLoan = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { loanId } = req.params;

    const loan = await Loan.findById(
      loanId
    );

    if (!loan) {

      res.status(404).json({
        message: "Loan not found",
      });

      return;
    }


    if (
      loan.status !== LoanStatus.APPLIED
    ) {

      res.status(400).json({
        message:
          "Only applied loans can be sanctioned",
      });

      return;
    }


    loan.status =
      LoanStatus.SANCTIONED;

    await loan.save();


    res.status(200).json({

      message:
        "Loan sanctioned successfully",

      loan,
    });

  } catch (error) {

    console.log(
      "Sanction Loan Error:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ======================================
// REJECT LOAN
// ======================================

export const rejectLoan = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { loanId } = req.params;

    const { rejectionReason } =
      req.body;


    if (!rejectionReason) {

      res.status(400).json({
        message:
          "Rejection reason required",
      });

      return;
    }


    const loan = await Loan.findById(
      loanId
    );

    if (!loan) {

      res.status(404).json({
        message: "Loan not found",
      });

      return;
    }


    if (
      loan.status !== LoanStatus.APPLIED
    ) {

      res.status(400).json({
        message:
          "Only applied loans can be rejected",
      });

      return;
    }


    loan.status =
      LoanStatus.REJECTED;

    loan.rejectionReason =
      rejectionReason;

    await loan.save();


    res.status(200).json({

      message:
        "Loan rejected successfully",

      loan,
    });

  } catch (error) {

    console.log(
      "Reject Loan Error:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ======================================
// DISBURSE LOAN
// ======================================

export const disburseLoan = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { loanId } = req.params;

    const loan = await Loan.findById(
      loanId
    );

    if (!loan) {

      res.status(404).json({
        message: "Loan not found",
      });

      return;
    }


    if (
      loan.status !==
      LoanStatus.SANCTIONED
    ) {

      res.status(400).json({
        message:
          "Only sanctioned loans can be disbursed",
      });

      return;
    }


    loan.status =
      LoanStatus.DISBURSED;

    await loan.save();


    res.status(200).json({

      message:
        "Loan disbursed successfully",

      loan,
    });

  } catch (error) {

    console.log(
      "Disbursement Error:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ======================================
// GET MY LOANS
// ======================================

export const getMyLoans = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const loans =
      await Loan.find({

        user:
          req.user?._id,
      });

    res.status(200).json({
      loans,
    });

  } catch (error) {

    console.log(
      "Get My Loans Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch loans",
    });
  }
};

export const getAppliedLoans =
async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const loans =
      await Loan.find({

        status:
          LoanStatus.APPLIED,
      });

    res.status(200).json({
      loans,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to fetch applied loans",
    });
  }
};



// ======================================
// GET DISBURSED LOANS
// ======================================

export const getDisbursedLoans = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const loans = await Loan.find({

      status:
        LoanStatus.DISBURSED,

    }).populate(
      "user",
      "fullName email"
    );

    res.status(200).json(loans);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};