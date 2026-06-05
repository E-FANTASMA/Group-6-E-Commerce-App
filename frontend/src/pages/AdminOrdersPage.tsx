import { useEffect, useMemo, useState } from "react";
import { Download, Eye, Search, X } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import {
  fetchOrders,
  parseCustomerName,
  type Order,
} from "../api/orders";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [viewedOrder, setViewedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const result = await fetchOrders();
      if (result.success) {
        setOrders(result.data);
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
        `${order.order_number} ${order.status} ${order.payment_status} ${parseCustomerName(order)}`.toLowerCase();
      const matchesSearch = haystack.includes(query.toLowerCase().trim());
      const matchesStatus =
        status === "All Status" ||
        order.status.toLowerCase() === status.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [orders, query, status]);

  function exportOrders() {
    const headers = [
      "Order Number",
      "Customer",
      "Status",
      "Payment Status",
      "Amount",
      "Created At",
    ];

    const rows = filteredOrders.map((order) => [
      order.order_number,
      parseCustomerName(order),
      order.status,
      order.payment_status,
      order.total_amount,
      new Date(order.created_at).toLocaleString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vale-orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminLayout
      title="Orders"
      subtitle="Track and manage customer orders, payment status, and fulfillment."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-[#e7dbd0] bg-white px-4 py-3 text-sm">
          <Search size={16} className="text-[#8d8178]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders..."
            className="w-full outline-none"
          />
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-[#e7dbd0] bg-white px-4 py-3 text-sm outline-none"
        >
          <option>All Status</option>
          <option>confirmed</option>
          <option>processing</option>
          <option>pending</option>
          <option>cancelled</option>
        </select>

        <button
          type="button"
          onClick={exportOrders}
          className="inline-flex items-center gap-2 rounded-full bg-[#2d7a4f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1f4d34]"
        >
          <Download size={16} />
          Export
        </button>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-[#e7dbd0] bg-white/80 shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-[#5f5952]">Loading orders...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#f0ebe4] bg-[#faf8f5] text-[#8d8178]">
                  <th className="px-5 py-4 font-semibold">Order ID</th>
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#f8f4ef] last:border-0">
                    <td className="px-5 py-4 font-medium text-[#1f1b18]">
                      {order.order_number}
                    </td>
                    <td className="px-5 py-4 text-[#5f5952]">
                      {parseCustomerName(order)}
                    </td>
                    <td className="px-5 py-4 text-[#5f5952]">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#1f1b18]">
                      ₦{Number(order.total_amount).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-[#e8f5e5] px-3 py-1 text-xs font-semibold capitalize text-[#1a7f2a]">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setViewedOrder(order)}
                        className="rounded-xl border border-[#e7dbd0] bg-white p-2.5 text-[#2d7a4f] hover:bg-[#f5f2ec]"
                        aria-label={`View ${order.order_number}`}
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-[#8d8178]">
                      No orders match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-[#8d8178]">
        Showing {filteredOrders.length} order(s)
      </p>

      {viewedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setViewedOrder(null)}
          role="presentation"
        >
          <section
            className="relative w-full max-w-lg rounded-[28px] bg-[#f5f2ec] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setViewedOrder(null)}
              className="absolute right-4 top-4 rounded-xl border border-[#e7dbd0] bg-white p-2"
              aria-label="Close order details"
            >
              <X size={18} />
            </button>

            <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f1b18]">
              {viewedOrder.order_number}
            </h2>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-[#8d8178]">Customer</dt>
                <dd className="mt-1 font-medium text-[#1f1b18]">
                  {parseCustomerName(viewedOrder)}
                </dd>
              </div>
              <div>
                <dt className="text-[#8d8178]">Status</dt>
                <dd className="mt-1 capitalize text-[#1f1b18]">{viewedOrder.status}</dd>
              </div>
              <div>
                <dt className="text-[#8d8178]">Payment status</dt>
                <dd className="mt-1 capitalize text-[#1f1b18]">
                  {viewedOrder.payment_status}
                </dd>
              </div>
              <div>
                <dt className="text-[#8d8178]">Total amount</dt>
                <dd className="mt-1 font-bold text-[#1f1b18]">
                  ₦{Number(viewedOrder.total_amount).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-[#8d8178]">Created at</dt>
                <dd className="mt-1 text-[#1f1b18]">
                  {new Date(viewedOrder.created_at).toLocaleString()}
                </dd>
              </div>
              {viewedOrder.items && viewedOrder.items.length > 0 && (
                <div>
                  <dt className="text-[#8d8178]">Items</dt>
                  <dd className="mt-2 space-y-2">
                    {viewedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-[#e7dbd0] bg-white px-4 py-3"
                      >
                        <p className="font-medium text-[#1f1b18]">
                          {item.product_name || item.product_id}
                        </p>
                        <p className="text-[#5f5952]">
                          Qty: {item.quantity} · ₦
                          {Number(item.unit_price).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
