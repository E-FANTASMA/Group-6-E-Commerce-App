import { useState } from "react";
import { Search, Filter, Download, Eye, TrendingUp, Users } from "lucide-react";
import { customersData, customerStats } from "../../data/dashboardData";

export default function AdminCustomers() {
  const [search, setSearch] = useState("");

  const filtered = customersData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1a2e1a", margin: 0 }}>
          Customers
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
          Manage and view all customers.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {customerStats.map((stat) => (
          <div key={stat.id} style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Users size={18} color={stat.color} />
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px 0", fontWeight: 500 }}>
              {stat.label}
            </p>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#1a2e1a", margin: "0 0 8px 0" }}>
              {stat.value}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <TrendingUp size={12} color="#4caf43" />
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#16a34a" }}>{stat.change}</span>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter + Export */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              paddingLeft: "32px",
              paddingRight: "12px",
              paddingTop: "8px",
              paddingBottom: "8px",
              fontSize: "13px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", color: "#374151", cursor: "pointer", fontWeight: 500 }}>
            <Filter size={14} />
            Filter
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", color: "#374151", cursor: "pointer", fontWeight: 500 }}>
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
              {["Customer", "Email", "Orders", "Status", "Joined", "Action"].map((h) => (
                <th key={h} style={{ textAlign: "left", fontSize: "12px", color: "#6b7280", fontWeight: 600, padding: "14px 16px" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr key={customer.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                {/* Customer */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "#e8f5e5", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#2d5a27"
                    }}>
                      {customer.avatar}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#1f2937" }}>
                      {customer.name}
                    </span>
                  </div>
                </td>

                {/* Email */}
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280" }}>
                  {customer.email}
                </td>

                {/* Orders */}
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#1f2937" }}>
                  {customer.orders} orders
                </td>

                {/* Status */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px",
                    background: customer.status === "active" ? "#dcfce7" : "#fee2e2",
                    color: customer.status === "active" ? "#15803d" : "#dc2626",
                  }}>
                    {customer.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Joined */}
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280" }}>
                  {customer.joined}
                </td>

                {/* Action */}
                <td style={{ padding: "14px 16px" }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px" }}>
                    <Eye size={15} color="#6b7280" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderTop: "1px solid #f0f0f0" }}>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
            Showing 1 to {filtered.length} of 50 customers
          </p>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {[1, 2, 3].map((p) => (
              <button key={p} style={{
                width: "32px", height: "32px", borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: p === 1 ? "#2d5a27" : "#fff",
                color: p === 1 ? "#fff" : "#374151",
                cursor: "pointer", fontSize: "13px", fontWeight: 600
              }}>
                {p}
              </button>
            ))}
            <span style={{ fontSize: "13px", color: "#6b7280" }}>...</span>
            <button style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: "13px" }}>7</button>
          </div>
        </div>
      </div>
    </div>
  );
}