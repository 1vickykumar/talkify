
import User from "../model/user.model.js";
import jwt from "jsonwebtoken"
export const socketAuthMiddleware = async (socket, next) => {
  try {

    // console.log("Handshake headers:", socket.handshake.headers);

    const cookie = socket.handshake.headers.cookie;

    // console.log("Cookies received:", cookie);
    if (!cookie) {
      return next(new Error("Unauthorized - No cookie"));
    }
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("jwt="))
      ?.split("=")[1];
    // console.log("Extracted token:", token);
    if (!token) {
      return next(new Error("Unauthorized - No Token"));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(new Error("User not found"));
    }
    socket.user = user;
    console.log(`Socket authenticated: ${user.userName}`);
    next();
  } catch (error) {
    console.log("Socket Auth Error:", error.message);
    next(new Error("Authentication failed"));

  }
};