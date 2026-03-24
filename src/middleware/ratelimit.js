
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1* 60 * 1000, // 15 minutes
  max: 50, // max 100 requests per IP
  message: {
    status: "failed",
    message: "Too many requests, please try again later."
  }
});

export default limiter;