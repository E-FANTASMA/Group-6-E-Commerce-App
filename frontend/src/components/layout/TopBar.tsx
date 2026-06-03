import { useState } from "react";
import { Search, Bell, ChevronDown, Calendar } from "lucide-react";

export default function Topbar() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: "220px",
        right: 0,
        height: "64px",
        background: "#ffffff",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 20,
      }}
    >
      {/* Search */}
      <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
        <Search
          size={16}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9ca3af",
          }}
        />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          style={{
            width: "100%",
            paddingLeft: "36px",
            paddingRight: "16px",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "14px",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Date range */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "#6b7280",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "6px 12px",
          }}
        >
          <Calendar size={13} />
          <span>May 20, 2024 – May 26, 2024</span>
          <ChevronDown size={12} />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Bell size={16} color="#6b7280" />
          </button>
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#4caf43",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </span>
        </div>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#2d5a27",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            AU
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#1f2937", margin: 0, lineHeight: 1.2 }}>
              Admin User
            </p>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
              Super Admin
            </p>
          </div>
          <ChevronDown size={14} color="#9ca3af" />
        </div>
      </div>
    </header>
  );
}