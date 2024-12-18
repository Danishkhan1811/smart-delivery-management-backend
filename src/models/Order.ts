import mongoose, { Document, Schema } from "mongoose";

// TypeScript interface for Order
export interface IOrder extends Document {
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  area: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: "pending" | "assigned" | "picked" | "delivered";
  scheduledFor: string; // HH:mm format
  assignedTo?: mongoose.Schema.Types.ObjectId; // Delivery Partner ID
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// MongoDB Schema for Order
const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    area: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "assigned", "picked", "delivered"],
      default: "pending",
    },
    scheduledFor: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPartner" },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
