"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/dashboard/products", icon: ShoppingBag },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Orders", href: "/dashboard/orders", icon: ClipboardList },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-30"
      style={{
        width: "220px",
        background: "linear-gradient(180deg, #1a3320 0%, #162b1a 100%)",
        boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
      }}
    >
  {/* Logo */}
<div className="px-6 py-6 border-b border-white/10">
  <span
    style={{
   fontFamily: "'Fredoka One', cursive",
   fontSize: "2.4rem",
   color: "#5dcc52",
   letterSpacing: "0.08em",
   lineHeight: "1",
  }}
  >
    vale
  </span>
</div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-[3px] ${
                isActive
                  ? "bg-white/10 border-green-400 text-white"
                  : "border-transparent text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-white/10">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white w-full text-left transition-all">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}