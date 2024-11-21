import express from "express";
import {
  getAllAssignments,
  createAssignment,
  updateAssignmentStatus,
} from "../controllers/assignment";

const router = express.Router();

// Route Definitions
router.get("/", getAllAssignments); // Fetch all assignments
router.post("/", createAssignment); // Create a new assignment
router.put("/:id/status", updateAssignmentStatus); // Update an assignment's status

export default router;
