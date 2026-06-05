import React, { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Download,
  Eye,
  Home,
  LogOut,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

import { useEffect } from "react";
import { getAuthToken } from "../api/auth";

type Order = {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  shipping_address: string;
};



const navItems = [
  { label: "Shop", icon: Home, path: "/shop" },
  { label: "Products", icon: Package, path: "/products" },
  { label: "Customers", icon: Users, path: "/customers" },
  { label: "Orders", icon: ShoppingBag, path: "/orders", active: true },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [dateRange, setDateRange] = useState("May 20, 2024 - May 26, 2024");
  const [viewedOrder, setViewedOrder] = useState<Order | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
  loadOrders();
}, []);

async function loadOrders() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (result.success) {
      setOrders(result.data);
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

 const filteredOrders = useMemo(() => {
  return orders.filter((order) => {
    const haystack =
      `${order.order_number} ${order.status} ${order.payment_status}`
        .toLowerCase();

    const matchesSearch = haystack.includes(
      query.toLowerCase().trim()
    );

    const matchesStatus =
      status === "All Status" ||
      order.status.toLowerCase() === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });
}, [orders, query, status]);

  function resetToFirstPage<T>(setter: Dispatch<SetStateAction<T>>, value: T) {
    setter(value);
  }

function exportOrders() {
  const headers = [
    "Order Number",
    "Status",
    "Payment Status",
    "Amount",
    "Created At",
  ];

  const rows = filteredOrders.map((order) => [
    order.order_number,
    order.status,
    order.payment_status,
    order.total_amount,
    new Date(order.created_at).toLocaleString(),
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${cell}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "orders.csv";
  link.click();

  URL.revokeObjectURL(url);
}

function getCustomerName(order: Order) {
  try {
    const address = JSON.parse(order.shipping_address);
    return address.fullName || "Unknown Customer";
  } catch {
    return "Unknown Customer";
  }
}

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">vale</div>

        <nav className="nav-list" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={`nav-item ${item.active ? "active" : ""}`}
                key={item.label}
                onClick={() => navigate(item.path)}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button className="logout" type="button">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <section className="content">
        <header className="topbar">
          <label className="search-box">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => resetToFirstPage(setQuery, event.target.value)}
              placeholder="Search anything..."
              type="search"
            />
          </label>

          <div className="top-actions">
            <button
              aria-label="Show notifications"
              className="icon-button notification-button"
              onClick={() => setNotificationsOpen((open) => !open)}
              type="button"
            >
              <Bell size={20} />
              <span className="badge">3</span>
            </button>

            <div className="user-menu">
              <button className="user-button" onClick={() => setProfileOpen((open) => !open)} type="button">
                <img
                  alt="Admin profile"
                  src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=96&q=80"
                />
                <span>
                  <strong>Admin User</strong>
                  <small>Super Admin</small>
                </span>
                <ChevronDown size={16} />
              </button>
              {profileOpen && (
                <div className="popover profile-popover">
                  <button type="button">View profile</button>
                  <button type="button">Account settings</button>
                  <button type="button">Sign out</button>
                </div>
              )}
            </div>
          </div>

          {notificationsOpen && (
            <div className="popover notifications-popover">
              <strong>Notifications</strong>
              <p>3 orders need review today.</p>
              <p>Export completed successfully.</p>
            </div>
          )}
        </header>

        <div className="page-title">
          <h1>Orders</h1>
          <p>Track and manage customer orders.</p>
        </div>



        <section className="filters" aria-label="Order filters">
          <select value={status} onChange={(event) => resetToFirstPage(setStatus, event.target.value)}>
            <option>All Status</option>
            <option>confirmed</option>
            <option>processing</option>
            <option>pending</option>
            <option>cancelled</option>
          </select>

          <div className="filter-right">
            <select value={dateRange} onChange={(event) => resetToFirstPage(setDateRange, event.target.value)}>
              <option>May 20, 2024 - May 26, 2024</option>
              <option>May 26, 2024</option>
              <option>May 25, 2024</option>
            </select>
            <button className="export-button" onClick={exportOrders} type="button">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </section>

        <section className="table-panel">
          {loading && (
            <div className="p-4 text-sm">
              Loading orders...
            </div>
          )}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.order_number}</td>
                    <td>{getCustomerName(order)}</td>
                    <td>
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      ₦ {Number(order.total_amount).toLocaleString()}
                    </td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                    </td>
                    <td>
                      <button
                        aria-label={`View ${order.id}`}
                        className="view-button"
                        onClick={() => setViewedOrder(order)}
                        type="button"
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td className="empty-state" colSpan={6}>
                      No orders match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="pagination">
          <p>
            Showing {filteredOrders.length} order(s)
          </p>
        </footer>
      </section>

      {viewedOrder && (
        <div className="modal-backdrop" onClick={() => setViewedOrder(null)} role="presentation">
          <section
            aria-modal="true"
            className="modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button aria-label="Close order details" className="modal-close" onClick={() => setViewedOrder(null)} type="button">
              <X size={18} />
            </button>
            <h2>{viewedOrder.order_number}</h2>
            <dl>
  <div>
    <dt>Order Number</dt>
    <dd>{viewedOrder.order_number}</dd>
  </div>

  <div>
    <dt>Status</dt>
    <dd>
      <span
        className={`status ${viewedOrder.status.toLowerCase()}`}
      >
        {viewedOrder.status}
      </span>
    </dd>
  </div>

  <div>
    <dt>Payment Status</dt>
    <dd>{viewedOrder.payment_status}</dd>
  </div>

  <div>
    <dt>Total Amount</dt>
    <dd>
      ₦ {Number(viewedOrder.total_amount).toLocaleString()}
    </dd>
  </div>

  <div>
    <dt>Created At</dt>
    <dd>
      {new Date(
        viewedOrder.created_at
      ).toLocaleString()}
    </dd>
  </div>
            </dl>
                      </section>
                    </div>
                  )}
                </main>
              );
}
