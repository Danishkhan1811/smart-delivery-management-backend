import mongoose, { Document, Schema } from "mongoose";

// TypeScript interface for Assignment
export interface IAssignment extends Document {
  orderId: mongoose.Schema.Types.ObjectId; // Refers to Order ID
  partnerId: mongoose.Schema.Types.ObjectId; // Refers to Delivery Partner ID
  timestamp: Date;
  status: "success" | "failed";
  reason?: string;
}

// MongoDB Schema for Assignment
const AssignmentSchema: Schema = new Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPartner", required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["success", "failed"], required: true },
  reason: { type: String },
});

export default mongoose.model<IAssignment>("Assignment", AssignmentSchema);
