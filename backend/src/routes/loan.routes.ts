import express from "express";

import {
  applyLoan,
  sanctionLoan,
  rejectLoan,
  disburseLoan,
  getDisbursedLoans,
  getAppliedLoans
} from "../controllers/loan.controller";

import {
  getMyLoans,
} from "../controllers/loan.controller";


import authMiddleware from "../middlewares/auth.middleware";

import authorizeRoles from "../middlewares/rbac.middleware";

const router = express.Router();


// =====================================
// APPLY LOAN
// =====================================

router.post(
  "/apply",
  authMiddleware,
  applyLoan
);


// =====================================
// BORROWER - MY LOANS
// =====================================

router.get(
  "/my-loans",
  authMiddleware,
  getMyLoans
);


// =====================================
// SANCTION DASHBOARD
// =====================================

router.get(
  "/applied",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SANCTION"
  ),
  // getAppliedLoans
);


// =====================================
// SANCTION LOAN
// =====================================

router.patch(
  "/sanction/:loanId",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SANCTION"
  ),
  sanctionLoan
);


// =====================================
// REJECT LOAN
// =====================================

router.patch(
  "/reject/:loanId",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SANCTION"
  ),
  rejectLoan
);

export default router;



router.patch(
  "/disburse/:loanId",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "DISBURSEMENT"
  ),
  disburseLoan
);

router.get(
  "/applied",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SANCTION"
  ),
  getAppliedLoans
);



router.get(
  "/disbursed",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "COLLECTION"
  ),
  getDisbursedLoans
);

router.patch(
  "/disburse/:loanId",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "DISBURSEMENT"
  ),
  disburseLoan
);