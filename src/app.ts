import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "./utils/db";
import dotenv from "dotenv";
import { initializeMetrics } from "./controllers/assignmentMetrics";
import deliveryPartnerRoutes from "./routes/deliveryPartner";
import orderRoutes from "./routes/order";
import assignmentRoutes from "./routes/assignment";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.use("/api/partners", require("./routes/partners"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/assignments", require("./routes/assignments"));

// Database Connection
connectDB();
initializeMetrics();

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send({ message: "Internal Server Error" });
});

export default app;
