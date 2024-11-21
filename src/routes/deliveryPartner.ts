import express from "express";
import {
  getAllDeliveryPartners,
  getDeliveryPartnerById,
  createDeliveryPartner,
  updateDeliveryPartner,
  deleteDeliveryPartner,
} from "../controllers/deliveryPartner";

const router = express.Router();

// Route Definitions
router.get("/", getAllDeliveryPartners); // Fetch all delivery partners
router.get("/:id", getDeliveryPartnerById); // Fetch a single delivery partner
router.post("/", createDeliveryPartner); // Create a new delivery partner
router.put("/:id", updateDeliveryPartner); // Update a delivery partner
router.delete("/:id", deleteDeliveryPartner); // Delete a delivery partner

export default router;
