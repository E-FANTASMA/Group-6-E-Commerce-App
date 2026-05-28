import { useNavigate, useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h2 style={{ marginBottom: 8 }}>Product</h2>
      <p style={{ marginBottom: 16, color: "#666" }}>Product details placeholder for id: {id}</p>
      <button onClick={() => navigate("/dashboard")}>Back to dashboard</button>
    </div>
  );
}

