import express from "express";

import authMiddleware
from "../middlewares/auth.middleware";

import authorizeRoles
from "../middlewares/rbac.middleware";

import {
  recordPayment,
}
from "../controllers/payment.controller";

const router = express.Router();

router.post(
  "/:loanId",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "COLLECTION"
  ),
  recordPayment
);

export default router;