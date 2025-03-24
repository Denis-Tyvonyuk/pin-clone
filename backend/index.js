import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import boardRouter from "./routes/board.route.js";
import commentRouter from "./routes/comment.route.js";
import pinRouter from "./routes/pin.route.js";
import connectDB from "./utils/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/comments", commentRouter);
app.use("/pins", pinRouter);

app.listen(3000, () => {
  connectDB();
  console.log("server is running1");
});
