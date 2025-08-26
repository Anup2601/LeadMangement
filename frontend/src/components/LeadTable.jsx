import React, { useEffect, useState } from "react";
import { useLeadStore } from "../store/leadStore";
import LeadHeader from "./LeadHeader";

export default function LeadsTable() {
  const { leads, page, totalPages, fetchLeads, deleteLead, updateLead, setPage } =
    useLeadStore();

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ email: "", company: "", city: "", status: "" });
  const [filters, setFilters] = useState({
    email_contains: "",
    company_contains: "",
    city_contains: "",
    status: "",
    score_between: "",
    created_between: "",
  });

  useEffect(() => {
    fetchLeads({ page, ...filters });
  }, [page, filters]);

  const handleEditClick = (lead) => {
    setEditId(lead._id);
    setFormData({
      email: lead.email,
      company: lead.company,
      city: lead.city,
      status: lead.status,
    });
  };

  const handleSave = async (id) => {
    await updateLead(id, formData);
    setEditId(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      email_contains: "",
      company_contains: "",
      city_contains: "",
      status: "",
      score_between: "",
      created_between: "",
    });
    setPage(1);
  };

  return (
    <>
    <LeadHeader/>
    
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lead Management</h1>

      {/* Filters */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter Leads</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="email_contains"
            value={filters.email_contains}
            onChange={handleFilterChange}
            placeholder="Search Email"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="company_contains"
            value={filters.company_contains}
            onChange={handleFilterChange}
            placeholder="Search Company"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="city_contains"
            value={filters.city_contains}
            onChange={handleFilterChange}
            placeholder="Search City"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
          <input
            type="text"
            name="score_between"
            value={filters.score_between}
            onChange={handleFilterChange}
            placeholder="Score (e.g. 10,50)"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="created_between"
            value={filters.created_between}
            onChange={handleFilterChange}
            placeholder="Created (YYYY-MM-DD,YYYY-MM-DD)"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => fetchLeads({ page: 1, ...filters })}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto shadow rounded-xl bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">Email</th>
              <th className="p-3">Company</th>
              <th className="p-3">City</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t hover:bg-gray-50">
                {editId === lead._id ? (
                  <>
                    <td className="p-2">
                      <input
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2 flex gap-2 justify-center">
                      <button
                        onClick={() => handleSave(lead._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{lead.email}</td>
                    <td className="p-2">{lead.company}</td>
                    <td className="p-2">{lead.city}</td>
                    <td className="p-2">{lead.status}</td>
                    <td className="p-2 flex gap-2 justify-center">
                      <button
                        onClick={() => handleEditClick(lead)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteLead(lead._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
}
