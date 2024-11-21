import { Request, Response } from "express";
import DeliveryPartner from "../models/DeliveryPartner";

// Get all Delivery Partners
export const getAllDeliveryPartners = async (req: Request, res: Response) => {
  try {
    const partners = await DeliveryPartner.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching delivery partners", error });
  }
};

// Get a Single Delivery Partner
export const getDeliveryPartnerById = async (req: Request, res: Response) => {
  try {
    const partner = await DeliveryPartner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: "Delivery Partner not found" });
    }
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ message: "Error fetching delivery partner", error });
  }
};

// Create a New Delivery Partner
export const createDeliveryPartner = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, status, areas, shift } = req.body;

    const newPartner = new DeliveryPartner({
      name,
      email,
      phone,
      status,
      areas,
      shift,
    });

    const savedPartner = await newPartner.save();
    res.status(201).json(savedPartner);
  } catch (error) {
    res.status(500).json({ message: "Error creating delivery partner", error });
  }
};

// Update an Existing Delivery Partner
export const updateDeliveryPartner = async (req: Request, res: Response) => {
  try {
    const updatedPartner = await DeliveryPartner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPartner) {
      return res.status(404).json({ message: "Delivery Partner not found" });
    }

    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(500).json({ message: "Error updating delivery partner", error });
  }
};

// Delete a Delivery Partner
export const deleteDeliveryPartner = async (req: Request, res: Response) => {
  try {
    const deletedPartner = await DeliveryPartner.findByIdAndDelete(req.params.id);
    if (!deletedPartner) {
      return res.status(404).json({ message: "Delivery Partner not found" });
    }
    res.status(200).json({ message: "Delivery Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting delivery partner", error });
  }
};
