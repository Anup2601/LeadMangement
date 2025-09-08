import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/leads"; // update if needed

export const useLeadStore = create((set, get) => ({
  leads: [],
  page: 1,
  totalPages: 1,
  filters: {},
  loading: false,

  // Fetch Leads
  fetchLeads: async (params = {}) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(API_URL, { params: { page: get().page, ...get().filters, ...params } });
      set({ leads: data.data, totalPages: data.totalPages, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  // Create Lead
  createLead: async (leadData) => {
    try {
      await axios.post(API_URL, leadData);
      get().fetchLeads();
    } catch (err) {
      console.error(err);
    }
  },

  // Update Lead
  updateLead: async (id, leadData) => {
    try {
      await axios.put(`${API_URL}/${id}`, leadData);
      get().fetchLeads();
    } catch (err) {
      console.error(err);
    }
  },

  // Delete Lead
  deleteLead: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      get().fetchLeads();
    } catch (err) {
      console.error(err);
    }
  },

  setPage: (page) => set({ page }),
  setFilters: (filters) => set({ filters })
}));
