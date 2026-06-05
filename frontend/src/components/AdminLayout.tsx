import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Store,
  LogOut,
} from "lucide-react";
import ValeLogo from "./ValeLogo";
import {
  clearAuthToken,
  clearUserData,
  getUserData,
} from "../api/auth";

type AdminLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Products", icon: Package, path: "/admin/products" },
  { label: "Orders", icon: ShoppingBag, path: "/admin/orders" },
  { label: "Customers", icon: Users, path: "/admin/customers" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminLayout({
  title,
  subtitle,
  children,
}: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUserData();

  function handleLogout() {
    clearAuthToken();
    clearUserData();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#2b1d18] px-4 py-6 sm:px-6 sm:py-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plaster&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');
        body { font-family: 'Inter', sans-serif; background: #2b1d18; }
      `}</style>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-[32px] bg-[#f5f2ec] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <aside className="flex w-64 shrink-0 flex-col bg-gradient-to-b from-[#1f4d34] to-[#163a28] p-5 text-white">
          <div className="mb-8 flex justify-center">
            <ValeLogo size="sm" />
          </div>

          <p className="mb-4 px-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
            Admin Panel
          </p>

          <nav className="flex flex-1 flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Store size={18} />
              View Store
            </button>
          </nav>

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="truncate px-2 text-sm font-semibold text-white">
              {user?.fullName || "Admin"}
            </p>
            <p className="truncate px-2 text-xs text-white/60">
              {user?.email}
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/15"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto p-6 sm:p-8">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8d8178]">
              Vale Admin
            </p>
            <h1 className="mt-2 font-['Cormorant_Garamond'] text-4xl font-bold text-[#1f1b18]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5f5952] sm:text-base">
                {subtitle}
              </p>
            )}
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
