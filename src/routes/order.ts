import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order";

const router = express.Router();

// Route Definitions
router.get("/", getAllOrders); // Fetch all orders
router.get("/:id", getOrderById); // Fetch a single order
router.post("/", createOrder); // Create a new order
router.put("/:id/status", updateOrderStatus); // Update the status of an order
router.delete("/:id", deleteOrder); // Delete an order

export default router;
