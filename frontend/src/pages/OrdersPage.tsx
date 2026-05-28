import React, { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
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

const orders = [
  { id: "#ORD-0029", customer: "John Doe", date: "May 26, 2024", amount: "N25,000", status: "Completed" },
  { id: "#ORD-0028", customer: "Jane Smith", date: "May 26, 2024", amount: "N15,500", status: "Pending" },
  { id: "#ORD-0027", customer: "Mike Johnson", date: "May 26, 2024", amount: "N32,000", status: "Completed" },
  { id: "#ORD-0026", customer: "Sarah Williams", date: "May 25, 2024", amount: "N12,000", status: "Pending" },
  { id: "#ORD-0025", customer: "David Brown", date: "May 25, 2024", amount: "N18,750", status: "Canceled" },
  { id: "#ORD-0024", customer: "Emily Davis", date: "May 24, 2024", amount: "N8,000", status: "Completed" },
];

type Order = (typeof orders)[number];

const summaryCards = [
  { title: "Total Orders", value: "1,290", delta: "18% from last month", icon: ClipboardList, tone: "blue" },
  { title: "Pending Orders", value: "230", delta: "8% from last month", icon: ShoppingBag, tone: "gold" },
  { title: "Completed Orders", value: "1,030", delta: "20% from last month", icon: Package, tone: "green" },
  { title: "Canceled Orders", value: "30", delta: "25% from last month", icon: X, tone: "red" },
];

const navItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Products", icon: Package, path: "/products" },
  { label: "Customers", icon: Users, path: "/customers" },
  { label: "Orders", icon: ShoppingBag, path: "/orders", active: true },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function OrdersPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [dateRange, setDateRange] = useState("May 20, 2024 - May 26, 2024");
  const [page, setPage] = useState(1);
  const [viewedOrder, setViewedOrder] = useState<Order | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const haystack = `${order.id} ${order.customer} ${order.amount}`.toLowerCase();
      const matchesSearch = haystack.includes(query.toLowerCase().trim());
      const matchesStatus = status === "All Status" || order.status === status;
      const matchesDate =
        dateRange === "May 20, 2024 - May 26, 2024" ||
        (dateRange === "May 26, 2024" && order.date === "May 26, 2024") ||
        (dateRange === "May 25, 2024" && order.date === "May 25, 2024");

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [query, status, dateRange]);

  function resetToFirstPage<T>(setter: Dispatch<SetStateAction<T>>, value: T) {
    setter(value);
    setPage(1);
  }

  function exportOrders() {
    const headers = ["Order ID", "Customer", "Date", "Amount", "Status"];
    const rows = filteredOrders.map((order) => [order.id, order.customer, order.date, order.amount, order.status]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
    URL.revokeObjectURL(url);
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

        <section className="summary-grid" aria-label="Order summary">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <article className="summary-card" key={card.title}>
                <div className={`summary-icon ${card.tone}`}>
                  <Icon size={21} />
                </div>
                <div>
                  <p>{card.title}</p>
                  <strong>{card.value}</strong>
                  <span>{card.delta}</span>
                </div>
              </article>
            );
          })}
        </section>

        <section className="filters" aria-label="Order filters">
          <select value={status} onChange={(event) => resetToFirstPage(setStatus, event.target.value)}>
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Canceled</option>
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
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>{order.amount}</td>
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
          <p>Showing 1 to {filteredOrders.length} of 1,290 orders</p>
          <div className="page-controls">
            <button
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              type="button"
            >
              <ChevronLeft size={17} />
            </button>
            {[1, 2, 3].map((item) => (
              <button className={page === item ? "selected" : ""} key={item} onClick={() => setPage(item)} type="button">
                {item}
              </button>
            ))}
            <span>...</span>
            <button className={page === 215 ? "selected" : ""} onClick={() => setPage(215)} type="button">
              215
            </button>
            <button
              aria-label="Next page"
              onClick={() => setPage((current) => Math.min(215, current + 1))}
              type="button"
            >
              <ChevronRight size={17} />
            </button>
          </div>
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
            <h2>{viewedOrder.id}</h2>
            <dl>
              <div>
                <dt>Customer</dt>
                <dd>{viewedOrder.customer}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{viewedOrder.date}</dd>
              </div>
              <div>
                <dt>Amount</dt>
                <dd>{viewedOrder.amount}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span className={`status ${viewedOrder.status.toLowerCase()}`}>{viewedOrder.status}</span>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </main>
  );
}
