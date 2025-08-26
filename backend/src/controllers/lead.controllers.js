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


// Get all Leads with Pagination + Filtering
export const getLeads = async (req, res) => {
  try {
    let { page = 1, limit = 20, ...filters } = req.query;
    page = parseInt(page, 10);
    limit = Math.min(parseInt(limit, 10), 100);
    const skip = (page - 1) * limit;

    // Build MongoDB filter object
    const query = {};

    // String fields: equals / contains
    if (filters.email) query.email = filters.email;
    if (filters.email_contains) query.email = { $regex: filters.email_contains, $options: "i" };
    if (filters.company) query.company = filters.company;
    if (filters.company_contains) query.company = { $regex: filters.company_contains, $options: "i" };
    if (filters.city) query.city = filters.city;
    if (filters.city_contains) query.city = { $regex: filters.city_contains, $options: "i" };

    // Enums: equals / in
    if (filters.status) query.status = filters.status;
    if (filters.status_in) query.status = { $in: filters.status_in.split(",") };
    if (filters.source) query.source = filters.source;
    if (filters.source_in) query.source = { $in: filters.source_in.split(",") };

    // Numbers: equals / gt / lt / between
    if (filters.score) query.score = parseInt(filters.score, 10);
    if (filters.score_gt) query.score = { ...query.score, $gt: parseInt(filters.score_gt, 10) };
    if (filters.score_lt) query.score = { ...query.score, $lt: parseInt(filters.score_lt, 10) };
    if (filters.score_between) {
      const [min, max] = filters.score_between.split(",").map(Number);
      query.score = { $gte: min, $lte: max };
    }

    if (filters.lead_value) query.lead_value = Number(filters.lead_value);
    if (filters.lead_value_gt) query.lead_value = { ...query.lead_value, $gt: Number(filters.lead_value_gt) };
    if (filters.lead_value_lt) query.lead_value = { ...query.lead_value, $lt: Number(filters.lead_value_lt) };
    if (filters.lead_value_between) {
      const [min, max] = filters.lead_value_between.split(",").map(Number);
      query.lead_value = { $gte: min, $lte: max };
    }

    // Dates: on / before / after / between
    if (filters.created_on) query.created_at = new Date(filters.created_on);
    if (filters.created_before) query.created_at = { ...query.created_at, $lt: new Date(filters.created_before) };
    if (filters.created_after) query.created_at = { ...query.created_at, $gt: new Date(filters.created_after) };
    if (filters.created_between) {
      const [start, end] = filters.created_between.split(",").map(d => new Date(d));
      query.created_at = { $gte: start, $lte: end };
    }

    if (filters.last_activity_on) query.last_activity_at = new Date(filters.last_activity_on);
    if (filters.last_activity_before) query.last_activity_at = { ...query.last_activity_at, $lt: new Date(filters.last_activity_before) };
    if (filters.last_activity_after) query.last_activity_at = { ...query.last_activity_at, $gt: new Date(filters.last_activity_after) };
    if (filters.last_activity_between) {
      const [start, end] = filters.last_activity_between.split(",").map(d => new Date(d));
      query.last_activity_at = { $gte: start, $lte: end };
    }

    // Boolean
    if (filters.is_qualified !== undefined) query.is_qualified = filters.is_qualified === "true";

    // Fetch with pagination
    const [leads, total] = await Promise.all([
      Lead.find(query).skip(skip).limit(limit),
      Lead.countDocuments(query)
    ]);

    res.json({
      data: leads,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
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
