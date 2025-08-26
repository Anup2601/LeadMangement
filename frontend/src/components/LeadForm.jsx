import React, { useState } from "react";
import { useLeadStore } from "../store/leadStore";
import { useNavigate } from "react-router-dom";

export default function LeadForm() {
  const { createLead } = useLeadStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "website",
    status: "new",
    score: 0,
    lead_value: 0,
    last_activity_at: "",
    is_qualified: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLead(form);
    navigate("/leads");
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company: "",
      city: "",
      state: "",
      source: "website",
      status: "new",
      score: 0,
      lead_value: 0,
      last_activity_at: "",
      is_qualified: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border mb-4 rounded-lg shadow-md bg-white"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Lead</h2>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col">
          First Name
          <input
            type="text"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Last Name
          <input
            type="text"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Phone
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Company
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          City
          <input
            type="text"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          State
          <input
            type="text"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Source
          <select
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="border p-2 rounded"
            required
          >
            <option value="website">Website</option>
            <option value="facebook_ads">Facebook Ads</option>
            <option value="google_ads">Google Ads</option>
            <option value="referral">Referral</option>
            <option value="events">Events</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="flex flex-col">
          Status
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
            <option value="won">Won</option>
          </select>
        </label>

        <label className="flex flex-col">
          Score
          <input
            type="number"
            value={form.score}
            onChange={(e) => setForm({ ...form, score: Number(e.target.value) })}
            className="border p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          Lead Value
          <input
            type="number"
            value={form.lead_value}
            onChange={(e) =>
              setForm({ ...form, lead_value: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          Last Activity
          <input
            type="date"
            value={form.last_activity_at}
            onChange={(e) =>
              setForm({ ...form, last_activity_at: e.target.value })
            }
            className="border p-2 rounded"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_qualified}
            onChange={(e) =>
              setForm({ ...form, is_qualified: e.target.checked })
            }
          />
          Qualified
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
      >
        Save Lead
      </button>
    </form>
  );
}
