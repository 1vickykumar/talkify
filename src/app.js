import express from "express";
import { app } from "./utils/socket.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(
  cors({
    origin: "https://dhrma.store",
    credentials: true
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

app.use("/api/v2/auth", authRouter);
app.use("/api/v2/message", messageRouter);

export default app;