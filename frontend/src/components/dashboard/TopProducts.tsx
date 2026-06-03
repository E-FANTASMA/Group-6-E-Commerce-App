import { topProducts } from "../../data/dashboardData";

export default function TopProducts() {
  const maxSold = Math.max(...topProducts.map((p) => p.sold));

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
          Top Products
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

      {/* Products List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {topProducts.map((product) => {
          const barWidth = Math.round((product.sold / maxSold) * 100);
          return (
            <div
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: `${product.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                {product.icon}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#1f2937", margin: "0 0 6px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {product.name}
                </p>
                {/* Progress bar */}
                <div style={{ height: "6px", background: "#f3f4f6", borderRadius: "999px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${barWidth}%`,
                      background: product.color,
                      borderRadius: "999px",
                    }}
                  />
                </div>
              </div>

              {/* Price + Sold */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#1f2937", margin: "0 0 2px 0", fontFamily: "monospace" }}>
                  {product.price}
                </p>
                <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                  {product.sold} sold
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}