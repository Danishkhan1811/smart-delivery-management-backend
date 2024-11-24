import { Request, Response } from "express";
import AssignmentMetrics from "../models/AssignmentMetrics";

// Get assignment metrics
export const getMetrics = async (req: Request, res: Response):Promise<any> => {
  try {
    const metrics = await AssignmentMetrics.find();
    if (!metrics) {
      return res.status(404).json({ message: "No metrics data found." });
    }
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching metrics", error });
  }
};

// Initialize metrics (only if no metrics document exists)
export const initializeMetrics = async () => {
  const existingMetrics = await AssignmentMetrics.findOne();
  if (!existingMetrics) {
    await AssignmentMetrics.create({
      totalAssigned: 0,
      successRate: 0,
      averageTime: 0,
      failureReasons: [],
    });
    console.log("Initialized assignment metrics.");
  }
};

// Update metrics when an assignment status changes
export const updateMetrics = async (status: "success" | "failed", timeTaken?: number, failureReason?: string) => {
  const metrics = await AssignmentMetrics.findOne();
  if (!metrics) throw new Error("Metrics not initialized");

  // Update totals
  metrics.totalAssigned += 1;
  if (status === "success") {
    // Recalculate success rate and average time
    metrics.successRate = (metrics.successRate * (metrics.totalAssigned - 1) + 1) / metrics.totalAssigned * 100;
    metrics.averageTime =
      metrics.averageTime === 0 ? timeTaken! : (metrics.averageTime + timeTaken!) / 2;
  } else if (status === "failed" && failureReason) {
    // Increment failure reason count
    const reasonIndex = metrics.failureReasons.findIndex((reason) => reason.reason === failureReason);
    if (reasonIndex > -1) {
      metrics.failureReasons[reasonIndex].count += 1;
    } else {
      metrics.failureReasons.push({ reason: failureReason, count: 1 });
    }
  }

  await metrics.save();
};
