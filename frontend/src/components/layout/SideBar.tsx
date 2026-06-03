import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: ShoppingBag },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Orders", href: "/orders", icon: ClipboardList },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: "220px",
        background: "linear-gradient(180deg, #1a3320 0%, #162b1a 100%)",
        boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        zIndex: 30,
      }}
    >
      {/* Logo */}
<div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
  <link
    href="https://fonts.googleapis.com/css2?family=Righteous&display=swap"
    rel="stylesheet"
  />
  <span
    style={{
      fontFamily: "'Righteous', cursive",
      fontSize: "2.2rem",
      color: "#5dcc52",
      letterSpacing: "0.05em",
    }}
  >
    vale
  </span>
</div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "20px 12px", overflowY: "auto" }}>
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "8px",
                marginBottom: "4px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                borderLeft: isActive ? "3px solid #5dcc52" : "3px solid transparent",
                background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                transition: "all 0.2s ease",
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
              {isActive && <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.7 }} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "20px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "8px",
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            width: "100%",
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}