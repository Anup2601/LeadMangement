// controllers/lead.controllers.js
import Lead from "../models/lead.models.js";

// Create Lead
export const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Leads
// export const getLeads = async (req, res) => {
//   try {
//     const leads = await Lead.find();
//     res.json(leads);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Get Leads with Pagination
export const getLeads = async (req, res) => {
  try {
    // read query params
    let { page = 1, limit = 20 } = req.query;

    // convert to integers
    page = parseInt(page, 10);
    limit = Math.min(parseInt(limit, 10), 100); // max 100

    const skip = (page - 1) * limit;

    // get leads and total count
    const [leads, total] = await Promise.all([
      Lead.find().skip(skip).limit(limit),
      Lead.countDocuments()
    ]);

    // response format
    res.json({
      data: leads,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Lead by ID
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Lead
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
