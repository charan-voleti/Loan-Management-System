import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IPayment
extends Document {

  loan: mongoose.Types.ObjectId;

  utrNumber: string;

  amount: number;

  paymentDate: Date;
}

const paymentSchema =
new Schema<IPayment>(
  {

    loan: {
      type: Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },

    utrNumber: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPayment>(
  "Payment",
  paymentSchema
);