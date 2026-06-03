import { ShoppingBag, Package, CreditCard, UserPlus } from "lucide-react";
import { recentActivities } from "../../data/dashboardData";

const iconConfig: { [key: string]: { Icon: any; bg: string; color: string } } = {
  order: { Icon: ShoppingBag, bg: "#e8f5e5", color: "#4caf43" },
  product: { Icon: Package, bg: "#e3f2fd", color: "#2196f3" },
  payment: { Icon: CreditCard, bg: "#fff3e0", color: "#ff9800" },
  user: { Icon: UserPlus, bg: "#f3e5f5", color: "#9c27b0" },
};

export default function RecentActivities() {
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
      <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1a2e1a", margin: "0 0 16px 0" }}>
        Recent Activities
      </h2>

      {/* Activities */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {recentActivities.map((activity, idx) => {
          const { Icon, bg, color } = iconConfig[activity.icon];
          const isLast = idx === recentActivities.length - 1;
          return (
            <div key={activity.id} style={{ display: "flex", gap: "12px" }}>
              {/* Icon + timeline line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} color={color} />
                </div>
                {!isLast && (
                  <div style={{ width: "1px", flex: 1, background: "#f0f0f0", margin: "4px 0" }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: isLast ? "0" : "16px", flex: 1 }}>
                <p style={{ fontSize: "13px", color: "#374151", fontWeight: 500, margin: "0 0 2px 0", lineHeight: 1.4 }}>
                  {activity.message}
                </p>
                <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}