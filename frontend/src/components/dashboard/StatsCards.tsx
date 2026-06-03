import { TrendingUp, Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import { statsData } from "../../data/dashboardData";

const iconMap: { [key: string]: any } = {
  box: Package,
  cart: ShoppingCart,
  users: Users,
  money: DollarSign,
};

export default function StatsCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      {statsData.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <div
            key={stat.id}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #f0f0f0",
              cursor: "default",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <Icon size={18} color={stat.color} />
            </div>

            {/* Label */}
            <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px 0", fontWeight: 500 }}>
              {stat.label}
            </p>

            {/* Value */}
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#1a2e1a", margin: "0 0 8px 0" }}>
              {stat.value}
            </p>

            {/* Change */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <TrendingUp size={12} color={stat.positive ? "#4caf43" : "#ef4444"} />
              <span style={{ fontSize: "12px", fontWeight: 600, color: stat.positive ? "#16a34a" : "#dc2626" }}>
                {stat.change}
              </span>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>from last week</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}