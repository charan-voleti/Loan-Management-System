import express from "express";

import {
  signup,
  login,
} from "../controllers/auth.controller";

import authMiddleware from "../middlewares/auth.middleware";

import authorizeRoles from "../middlewares/rbac.middleware";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);


// protected route
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {

    res.json({
      message: "Protected Route",
      user: req.user,
    });

  }
);


// admin only route
router.get(
  "/admin",
  authMiddleware,
  authorizeRoles("ADMIN"),
  (req, res) => {

    res.json({
      message: "Welcome Admin",
    });

  }
);

export default router;