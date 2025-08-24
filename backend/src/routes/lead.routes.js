// routes/lead.routes.js
import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/lead.controllers.js";

const router = express.Router();

// Routes
router.post("/", createLead);         // Create
router.get("/", getLeads);            // Get all
router.get("/:id", getLeadById);      // Get by ID
router.put("/:id", updateLead);       // Update
router.delete("/:id", deleteLead);    // Delete

export default router;