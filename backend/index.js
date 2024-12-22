import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import noteRoute from "./routes/notes.js";
import userRoute from "./routes/users.js";

const app = express();
dotenv.config({ path: "./config/config.env" });
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/note", noteRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";
  res.status(errorStatus).json({
    error: true,
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
