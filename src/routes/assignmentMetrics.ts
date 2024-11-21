import express from "express";
import { getMetrics } from "../controllers/assignmentMetrics";

const router = express.Router();

// Route to fetch assignment metrics
router.get("/", getMetrics);

export default router;
