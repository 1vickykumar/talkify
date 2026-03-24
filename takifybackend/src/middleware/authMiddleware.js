import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../model/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {

    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "No token provided"
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - user not found"
      });
    }
    req.user = user;
    next();

  } catch (err) {
    console.error("Auth middleware error", err);
    return res.status(401).json({
      message: "Invalid token"
    });

  }
};