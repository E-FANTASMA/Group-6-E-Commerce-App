import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  Wallet,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { fetchProducts } from "../api/products";
import {
  countItemsSold,
  fetchOrders,
  parseCustomerName,
  type Order,
} from "../api/orders";
import type { Product } from "../api/products";

type StatCard = {
  label: string;
  value: string;
  icon: typeof Package;
  accent: string;
  bg: string;
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [productsResult, ordersResult] = await Promise.all([
        fetchProducts(),
        fetchOrders(),
      ]);

      if (productsResult.success) {
        setProducts(productsResult.data);
      }
      if (ordersResult.success) {
        setOrders(ordersResult.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total_amount || 0),
      0,
    );
    const itemsSold = countItemsSold(orders);
    const uniqueCustomers = new Set(
      orders.map((order) => parseCustomerName(order)),
    ).size;

    const cards: StatCard[] = [
      {
        label: "Total Products",
        value: String(products.length),
        icon: Package,
        accent: "#2d7a4f",
        bg: "#e8f5e5",
      },
      {
        label: "Total Orders",
        value: String(orders.length),
        icon: ShoppingBag,
        accent: "#1f4d34",
        bg: "#e3f2fd",
      },
      {
        label: "Items Sold",
        value: String(itemsSold),
        icon: TrendingUp,
        accent: "#4E8A66",
        bg: "#fff3e0",
      },
      {
        label: "Total Revenue",
        value: `₦${totalRevenue.toLocaleString()}`,
        icon: Wallet,
        accent: "#1a4d2e",
        bg: "#f3e5f5",
      },
    ];

    return { cards, uniqueCustomers };
  }, [orders, products]);

  const recentOrders = orders.slice(0, 5);
  const lowStock = products
    .filter((p) => Number(p.stock_quantity) <= 5)
    .slice(0, 5);

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Overview of your store performance, recent orders, and inventory at a glance."
    >
      {loading ? (
        <p className="text-sm text-[#5f5952]">Loading dashboard...</p>
      ) : (
        <div className="space-y-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-[24px] border border-[#e7dbd0] bg-white/80 p-5 shadow-sm"
                >
                  <div
                    className="mb-4 inline-flex rounded-2xl p-3"
                    style={{ backgroundColor: card.bg }}
                  >
                    <Icon size={22} style={{ color: card.accent }} />
                  </div>
                  <p className="text-sm text-[#8d8178]">{card.label}</p>
                  <p className="mt-1 text-2xl font-bold text-[#1f1b18]">
                    {card.value}
                  </p>
                </div>
              );
            })}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-[#e7dbd0] bg-white/80 p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f1b18]">
                  Recent Orders
                </h2>
                <button
                  type="button"
                  onClick={() => navigate("/admin/orders")}
                  className="flex items-center gap-1 text-sm font-semibold text-[#2d7a4f] hover:text-[#1f4d34]"
                >
                  View all
                  <ArrowRight size={16} />
                </button>
              </div>

              {recentOrders.length === 0 ? (
                <p className="text-sm text-[#8d8178]">No orders yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#f0ebe4] text-[#8d8178]">
                        <th className="pb-3 pr-4 font-medium">Order</th>
                        <th className="pb-3 pr-4 font-medium">Customer</th>
                        <th className="pb-3 pr-4 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-[#f8f4ef] last:border-0"
                        >
                          <td className="py-3 pr-4 font-medium text-[#1f1b18]">
                            {order.order_number}
                          </td>
                          <td className="py-3 pr-4 text-[#5f5952]">
                            {parseCustomerName(order)}
                          </td>
                          <td className="py-3 pr-4 text-[#1f1b18]">
                            ₦{Number(order.total_amount).toLocaleString()}
                          </td>
                          <td className="py-3">
                            <span className="rounded-full bg-[#e8f5e5] px-3 py-1 text-xs font-semibold capitalize text-[#1a7f2a]">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-[#e7dbd0] bg-gradient-to-br from-[#1f4d34] via-[#2d7a4f] to-[#8aa98b] p-6 text-white shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                  Quick actions
                </p>
                <h2 className="mt-2 font-['Cormorant_Garamond'] text-3xl font-bold">
                  Manage your store
                </h2>
                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/products")}
                    className="rounded-full bg-[#f5f2ec] px-5 py-3 text-sm font-semibold text-[#1f4d34] transition-colors hover:bg-white"
                  >
                    Add new product
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/admin/customers")}
                    className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    View customers ({stats.uniqueCustomers})
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-[#e7dbd0] bg-white/80 p-6 shadow-sm">
                <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f1b18]">
                  Low stock alerts
                </h2>
                {lowStock.length === 0 ? (
                  <p className="mt-3 text-sm text-[#8d8178]">
                    All products are well stocked.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {lowStock.map((product) => (
                      <li
                        key={product.id}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="font-medium text-[#1f1b18]">
                          {product.name}
                        </span>
                        <span className="rounded-full bg-[#fff3e0] px-3 py-1 text-xs font-semibold text-[#a66200]">
                          {product.stock_quantity} left
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
