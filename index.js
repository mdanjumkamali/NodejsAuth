import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";

import userRouter from "./routes/user.route.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
  res.send("Hello!!");
});

app.use("/api/", userRouter);

app.listen(PORT, () => {
  console.log(`app listening on port http://localhost:${PORT}`);
});
