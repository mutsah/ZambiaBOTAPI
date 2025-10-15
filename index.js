import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import clientApplicationRouter from "./routes/clientApplicationRouter.js";

// Load environment variables
dotenv.config({ path: `${process.cwd()}/.env` });

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/clientApplication", clientApplicationRouter);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from the server. SCMS API running!!",
  });
});

// 404 route
app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server up and running on port ${PORT}...`);
});
export default app;
