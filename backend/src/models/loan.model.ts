import mongoose, {
  Schema,
  Document,
} from "mongoose";

import { LoanStatus } from "../utils/constants";

export interface ILoan extends Document {

  user: mongoose.Types.ObjectId;

  fullName: string;

  panNumber: string;

  dateOfBirth: Date;

  monthlySalary: number;

  employmentStatus: string;

  loanAmount: number;

  tenureDays: number;

  interestRate: number;

  interestAmount: number;

  totalRepayment: number;

  totalPaid: number;

  outstandingAmount: number;

  salarySlip?: string;

  rejectionReason?: string;

  status: LoanStatus;
}

const loanSchema = new Schema<ILoan>(
  {

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    panNumber: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    monthlySalary: {
      type: Number,
      required: true,
    },

    employmentStatus: {
      type: String,
      enum: [
        "SALARIED",
        "SELF_EMPLOYED",
        "UNEMPLOYED",
      ],
      required: true,
    },

    loanAmount: {
      type: Number,
      required: true,
    },

    tenureDays: {
      type: Number,
      required: true,
    },

    interestRate: {
      type: Number,
      default: 12,
    },

    interestAmount: {
      type: Number,
      required: true,
    },

    totalRepayment: {
      type: Number,
      required: true,
    },

    totalPaid: {
      type: Number,
      default: 0,
    },

    outstandingAmount: {
      type: Number,
      required: true,
    },

    salarySlip: {
      type: String,
    },

    rejectionReason: {
      type: String,
    },

    status: {
      type: String,
      enum: Object.values(LoanStatus),
      default: LoanStatus.APPLIED,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILoan>(
  "Loan",
  loanSchema
);