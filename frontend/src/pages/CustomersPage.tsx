import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  fetchOrders,
  parseCustomerEmail,
  parseCustomerName,
  type Order,
} from "../api/orders";

type CustomerSummary = {
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrderDate: string;
};

function buildCustomerSummaries(orders: Order[]): CustomerSummary[] {
  const map = new Map<string, CustomerSummary>();

  orders.forEach((order) => {
    const name = parseCustomerName(order);
    const email = parseCustomerEmail(order) || `${name.toLowerCase().replace(/\s+/g, ".")}@customer.local`;
    const key = email || name;

    const existing = map.get(key);
    const amount = Number(order.total_amount || 0);

    if (existing) {
      existing.orders += 1;
      existing.totalSpent += amount;
      if (new Date(order.created_at) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = order.created_at;
      }
    } else {
      map.set(key, {
        name,
        email,
        orders: 1,
        totalSpent: amount,
        lastOrderDate: order.created_at,
      });
    }
  });

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime(),
  );
}

export default function CustomersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

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

  const customers = useMemo(() => buildCustomerSummaries(orders), [orders]);

  const filteredCustomers = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return customers;
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term),
    );
  }, [customers, query]);

  return (
    <AdminLayout
      title="Customers"
      subtitle="View shoppers who have placed orders and track their purchase activity."
    >
      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full max-w-md rounded-xl border border-[#e7dbd0] bg-white px-4 py-3 text-sm outline-none focus:border-[#4E8A66] sm:w-auto sm:min-w-[320px]"
        />
      </div>

      <div className="overflow-hidden rounded-[28px] border border-[#e7dbd0] bg-white/80 shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-[#5f5952]">Loading customers...</p>
        ) : filteredCustomers.length === 0 ? (
          <p className="p-10 text-center text-sm text-[#8d8178]">
            No customers found yet. They will appear here after orders are placed.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#f0ebe4] bg-[#faf8f5] text-[#8d8178]">
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 font-semibold">Orders</th>
                  <th className="px-5 py-4 font-semibold">Total spent</th>
                  <th className="px-5 py-4 font-semibold">Last order</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={`${customer.email}-${customer.name}`}
                    className="border-b border-[#f8f4ef] last:border-0"
                  >
                    <td className="px-5 py-4 font-medium text-[#1f1b18]">
                      {customer.name}
                    </td>
                    <td className="px-5 py-4 text-[#5f5952]">{customer.email}</td>
                    <td className="px-5 py-4 text-[#1f1b18]">{customer.orders}</td>
                    <td className="px-5 py-4 font-medium text-[#1f1b18]">
                      ₦{customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-[#5f5952]">
                      {new Date(customer.lastOrderDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
