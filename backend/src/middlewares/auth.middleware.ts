import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import User from "../models/user.model";


// =====================================
// JWT PAYLOAD TYPE
// =====================================

interface JwtPayload {

  id: string;
}


// =====================================
// CUSTOM REQUEST TYPE
// =====================================

export interface AuthRequest
extends Request {

  user?: any;
}


// =====================================
// AUTH MIDDLEWARE
// =====================================

const authMiddleware =
async (

  req: AuthRequest,

  res: Response,

  next: NextFunction

): Promise<void> => {

  try {

    let token;


    // CHECK AUTH HEADER
    if (

      req.headers.authorization &&

      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];


      // VERIFY TOKEN
      const decoded =
        jwt.verify(

          token,

          process.env.JWT_SECRET as string

        ) as JwtPayload;


      // ATTACH USER
      req.user =
        await User.findById(
          decoded.id
        ).select("-password");


      next();

    } else {

      res.status(401).json({

        message:
          "Not authorized, token missing",
      });
    }

  } catch (error) {

    console.log(
      "Auth Middleware Error:",
      error
    );

    res.status(401).json({

      message:
        "Not authorized, invalid token",
    });
  }
};

export default authMiddleware;