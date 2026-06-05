import { useNavigate } from "react-router-dom";

export default function CustomersPage() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h2 style={{ marginBottom: 8 }}>Customers</h2>
      <p style={{ marginBottom: 16, color: "#666" }}>Customers page placeholder.</p>
      <button onClick={() => navigate("/admin/dashboard")}>Back to dashboard</button>
    </div>
  );
}

