import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import loanRoutes from "./routes/loan.routes";
import uploadRoutes from "./routes/upload.routes";
import paymentRoutes from "./routes/payment.routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/uploads", uploadRoutes);


app.use(
  "/uploads",
  express.static("src/uploads")
);

app.use(
  "/api/payments",
  paymentRoutes
);


app.get("/", (req, res) => {
  res.send("LMS Backend Running");
});

export default app;