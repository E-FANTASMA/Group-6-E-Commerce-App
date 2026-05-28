import { useNavigate } from "react-router-dom";
import { clearAuthToken } from "../api/auth";

export default function AccountPage() {
  const navigate = useNavigate();

  function logout() {
    clearAuthToken();
    navigate("/login");
  }

  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h2 style={{ marginBottom: 8 }}>Account</h2>
      <p style={{ marginBottom: 16, color: "#666" }}>Account page placeholder.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => navigate("/dashboard")}>Back to dashboard</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

