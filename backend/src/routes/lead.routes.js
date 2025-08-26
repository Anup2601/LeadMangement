// routes/lead.routes.js
import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/lead.controllers.js";

const LeadRouter = express.Router();

// Routes
LeadRouter.post("/", createLead);         // Create
LeadRouter.get("/", getLeads);            // Get all
LeadRouter.get("/:id", getLeadById);      // Get by ID
LeadRouter.put("/:id", updateLead);       // Update
LeadRouter.delete("/:id", deleteLead);    // Delete

export default LeadRouter;