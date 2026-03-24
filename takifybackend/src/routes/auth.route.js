import express from 'express';
import { logout, register, updateProfile } from '../controller/authController.js';
import { signupValidation, validate } from '../middleware/validator.js';
import { login } from "../controller/authController.js"
import { authMiddleware } from '../middleware/authMiddleware.js';


const authRouter = express.Router();


authRouter.post("/signup", signupValidation, register)

authRouter.post("/login", login)
authRouter.post("/logout", logout)

authRouter.put("/update", authMiddleware, updateProfile)

authRouter.get("/check", authMiddleware, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Protected route accessed",
    user: req.user,
  });
})

export default authRouter;