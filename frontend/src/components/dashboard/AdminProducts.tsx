import { useState } from "react";
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { productsData } from "../../data/dashboardData";

const categories = ["All Categories", "Electronics", "Accessories", "Fashion", "Lifestyle"];

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = productsData.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All Categories" || p.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1a2e1a", margin: 0 }}>
          Products
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
          Manage and organize your store products.
        </p>
      </div>

      {/* Filters Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "8px 12px",
              fontSize: "13px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              background: "#fff",
              color: "#374151",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                paddingLeft: "32px",
                paddingRight: "12px",
                paddingTop: "8px",
                paddingBottom: "8px",
                fontSize: "13px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                outline: "none",
                width: "200px",
              }}
            />
          </div>
        </div>

        {/* Add Product Button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "#2d5a27",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
              {["Product", "Category", "Price", "Stock", "Status", "Action"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#6b7280",
                    fontWeight: 600,
                    padding: "14px 16px",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.id}
                style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.15s" }}
              >
                {/* Product */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                      {product.icon}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#1f2937" }}>
                      {product.name}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280" }}>
                  {product.category}
                </td>

                {/* Price */}
                <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 600, color: "#1f2937", fontFamily: "monospace" }}>
                  {product.price}
                </td>

                {/* Stock */}
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#1f2937" }}>
                  {product.stock}
                </td>

                {/* Status */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: product.status === "active" ? "#dcfce7" : "#fee2e2",
                    color: product.status === "active" ? "#15803d" : "#dc2626",
                  }}>
                    {product.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Action */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px" }}>
                      <Pencil size={15} color="#6b7280" />
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px" }}>
                      <Trash2 size={15} color="#ef4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderTop: "1px solid #f0f0f0" }}>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
            Showing 1 to {filtered.length} of 50 products
          </p>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={14} />
            </button>
            {[1, 2, 3].map((p) => (
              <button key={p} onClick={() => setCurrentPage(p)}
                style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e5e7eb", background: currentPage === p ? "#2d5a27" : "#fff", color: currentPage === p ? "#fff" : "#374151", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                {p}
              </button>
            ))}
            <span style={{ fontSize: "13px", color: "#6b7280" }}>...</span>
            <button style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: "13px" }}>9</button>
            <button onClick={() => setCurrentPage(Math.min(9, currentPage + 1))}
              style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}