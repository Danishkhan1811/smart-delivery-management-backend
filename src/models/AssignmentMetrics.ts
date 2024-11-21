import mongoose, { Document, Schema } from "mongoose";

// TypeScript interface
export interface IAssignmentMetrics extends Document {
  totalAssigned: number;
  successRate: number;
  averageTime: number;
  failureReasons: {
    reason: string;
    count: number;
  }[];
}

// MongoDB Schema
const AssignmentMetricsSchema: Schema = new Schema({
  totalAssigned: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 }, // Stored as a percentage (e.g., 85 for 85%)
  averageTime: { type: Number, default: 0 }, // Time in minutes
  failureReasons: [
    {
      reason: { type: String, required: true },
      count: { type: Number, default: 0 },
    },
  ],
});

export default mongoose.model<IAssignmentMetrics>("AssignmentMetrics", AssignmentMetricsSchema);
