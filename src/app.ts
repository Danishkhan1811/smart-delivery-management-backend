import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db";
import { initializeMetrics } from "./controllers/assignmentMetrics";

// Import Routes
import deliveryPartnerRoutes from "./routes/deliveryPartner";
import orderRoutes from "./routes/order";
import assignmentRoutes from "./routes/assignment";

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Database Connection
connectDB();

// Initialize Metrics
initializeMetrics().catch((err) => {
  console.error("Error initializing metrics:", err.message);
});

// API Routes
app.use("/api/partners", deliveryPartnerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/assignments", assignmentRoutes);

// Default Route for Health Check
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Smart Delivery Management API is running!" });
});

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

export default app;
