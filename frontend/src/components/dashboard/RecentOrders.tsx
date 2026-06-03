import { recentOrders } from "../../data/dashboardData";

const statusConfig: { [key: string]: { label: string; color: string; bg: string } } = {
  completed: { label: "Completed", color: "#15803d", bg: "#dcfce7" },
  pending: { label: "Pending", color: "#a16207", bg: "#fef9c3" },
  confirmed: { label: "Confirmed", color: "#1d4ed8", bg: "#dbeafe" },
  cancelled: { label: "Cancelled", color: "#dc2626", bg: "#fee2e2" },
};

export default function RecentOrders() {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid #f0f0f0",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1a2e1a", margin: 0 }}>
          Recent Orders
        </h2>
        <button
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#3a7a32",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          View all
        </button>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
            {["Order ID", "Customer", "Date", "Amount", "Status"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  fontSize: "11px",
                  color: "#9ca3af",
                  fontWeight: 500,
                  paddingBottom: "12px",
                  paddingRight: "12px",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order, idx) => {
            const status = statusConfig[order.status];
            return (
              <tr
                key={idx}
                style={{ borderBottom: "1px solid #f9fafb", cursor: "pointer" }}
              >
                <td style={{ padding: "12px 12px 12px 0", fontSize: "12px", color: "#4b5563", fontFamily: "monospace" }}>
                  {order.id}
                </td>
                <td style={{ padding: "12px 12px 12px 0", fontSize: "12px", fontWeight: 500, color: "#1f2937" }}>
                  {order.customer}
                </td>
                <td style={{ padding: "12px 12px 12px 0", fontSize: "12px", color: "#9ca3af" }}>
                  {order.date}
                </td>
                <td style={{ padding: "12px 12px 12px 0", fontSize: "12px", fontWeight: 600, color: "#1f2937", fontFamily: "monospace" }}>
                  {order.amount}
                </td>
                <td style={{ padding: "12px 0" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: status.color,
                      background: status.bg,
                      padding: "4px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}