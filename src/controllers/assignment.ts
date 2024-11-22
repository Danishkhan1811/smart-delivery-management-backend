import { Request, Response } from "express";
import Assignment from "../models/Assignment";
import Order from "../models/Order";
import DeliveryPartner from "../models/DeliveryPartner";

// Get all assignments
export const getAllAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find()
      .populate("orderId", "orderNumber customer area status")
      .populate("partnerId", "name email phone");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error });
  }
};

// Create a new assignment
export const createAssignment = async (req: Request, res: Response):Promise<any> => {
  const { orderId, partnerId } = req.body;

  try {
    // Ensure the order exists and is in a "pending" state
    const order = await Order.findById(orderId);
    if (!order || order.status !== "pending") {
      return res.status(400).json({ message: "Invalid or non-pending order" });
    }

    // Ensure the delivery partner exists and is active
    const partner = await DeliveryPartner.findById(partnerId);
    if (!partner || partner.status !== "active" || partner.currentLoad >= 3) {
      return res.status(400).json({ message: "Invalid or unavailable partner" });
    }

    // Create the assignment
    const newAssignment = new Assignment({ orderId, partnerId, status: "success" });
    const savedAssignment = await newAssignment.save();

    // Update the order's status and assigned partner
    order.status = "assigned";
    order.assignedTo = partnerId;
    await order.save();

    // Increment the partner's current load
    partner.currentLoad += 1;
    await partner.save();

    res.status(201).json(savedAssignment);
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment", error });
  }
};

// Update an assignment's status
export const updateAssignmentStatus = async (req: Request, res: Response):Promise<any> => {
  const { status, reason } = req.body;

  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Update the assignment status
    assignment.status = status;
    if (status === "failed") {
      assignment.reason = reason;
    }
    await assignment.save();

    // Update related entities based on assignment status
    if (status === "failed") {
      const order = await Order.findById(assignment.orderId);
      if (order) {
        order.status = "pending";
        order.assignedTo = undefined;
        await order.save();
      }

      const partner = await DeliveryPartner.findById(assignment.partnerId);
      if (partner) {
        partner.currentLoad = Math.max(partner.currentLoad - 1, 0);
        await partner.save();
      }
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error updating assignment status", error });
  }
};
