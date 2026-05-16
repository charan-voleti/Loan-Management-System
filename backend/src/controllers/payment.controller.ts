import { Request, Response }
from "express";

import Payment
from "../models/payment.model";

import Loan
from "../models/loan.model";

import { LoanStatus }
from "../utils/constants";


// =====================================
// RECORD PAYMENT
// =====================================

export const recordPayment =
async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { loanId } = req.params;

    const {
      utrNumber,
      amount,
    } = req.body;

    // validation
    if (
      !utrNumber ||
      !amount
    ) {

      res.status(400).json({
        message:
          "UTR and amount required",
      });

      return;
    }

    // duplicate UTR
    const existingUTR =
      await Payment.findOne({
        utrNumber,
      });

    if (existingUTR) {

      res.status(400).json({
        message:
          "Duplicate UTR number",
      });

      return;
    }

    // find loan
    const loan =
      await Loan.findById(loanId);

    if (!loan) {

      res.status(404).json({
        message:
          "Loan not found",
      });

      return;
    }

    // only disbursed loans
    if (
      loan.status !==
      LoanStatus.DISBURSED
    ) {

      res.status(400).json({
        message:
          "Payments allowed only for disbursed loans",
      });

      return;
    }

    // overpayment validation
    if (
      amount >
      loan.outstandingAmount
    ) {

      res.status(400).json({
        message:
          "Amount exceeds outstanding balance",
      });

      return;
    }

    // create payment
    const payment =
      await Payment.create({

        loan: loan._id,

        utrNumber,

        amount,

      });

    // update loan
    loan.totalPaid += amount;

    loan.outstandingAmount -= amount;

    // auto-close
    if (
      loan.outstandingAmount <= 0
    ) {

      loan.status =
        LoanStatus.CLOSED;

      loan.outstandingAmount = 0;
    }

    await loan.save();

    res.status(201).json({

      message:
        "Payment recorded successfully",

      payment,

      outstandingAmount:
        loan.outstandingAmount,

      status:
        loan.status,

    });

  } catch (error) {

    console.log(
      "Payment Error:",
      error
    );

    res.status(500).json({
      message:
        "Server Error",
    });

  }
};