import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h2 style={{ marginBottom: 8 }}>Shop</h2>
      <p style={{ marginBottom: 16, color: "#666" }}>Shop page placeholder.</p>
      <button onClick={() => navigate("/dashboard")}>Back to dashboard</button>
    </div>
  );
}

