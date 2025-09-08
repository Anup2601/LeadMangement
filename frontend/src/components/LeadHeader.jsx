import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // adjust path if different

export default function LeadHeader() {
  const navigate = useNavigate();
  const { logout } = useAuthStore(); // your zustand auth store (make sure it has logout)

  const handleLogout = () => {
    logout(); // clear token/session
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left: Brand / Links */}
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-lg">Lead Management</h1>
        <nav className="flex gap-4">
          <Link to="/leads" className="hover:underline">
            Home
          </Link>
          <Link to="/leads/update" className="hover:underline">
            Add Lead
          </Link>
        </nav>
      </div>

      {/* Right: Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg shadow"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
