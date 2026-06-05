import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  fetchOrders,
  parseCustomerName,
  type Order,
} from "../api/orders";

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-[#2b1d18] px-4 py-6 sm:px-6 sm:py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plaster&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');
        body { font-family: 'Inter', sans-serif; background: #2b1d18; }
      `}</style>

      <div className="mx-auto max-w-4xl rounded-[32px] bg-[#f5f2ec] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <button
          type="button"
          onClick={() => navigate("/account")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2d7a4f] hover:text-[#1f4d34]"
        >
          <ArrowLeft size={16} />
          Back to account
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8d8178]">
          Your orders
        </p>
        <h1 className="mt-2 font-['Cormorant_Garamond'] text-4xl font-bold text-[#1f1b18]">
          Order history
        </h1>
        <p className="mt-2 text-sm text-[#5f5952]">
          Track your recent purchases and order status.
        </p>

        <div className="mt-8 space-y-4">
          {loading ? (
            <p className="text-sm text-[#5f5952]">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-[#d8ccc0] bg-white/60 p-8 text-center">
              <p className="text-[#5f5952]">You have not placed any orders yet.</p>
              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="mt-4 rounded-full bg-[#2d7a4f] px-5 py-3 text-sm font-semibold text-white"
              >
                Start shopping
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <article
                key={order.id}
                className="rounded-[24px] border border-[#e7dbd0] bg-white/80 p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#1f1b18]">
                      {order.order_number}
                    </p>
                    <p className="mt-1 text-sm text-[#8d8178]">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#e8f5e5] px-3 py-1 text-xs font-semibold capitalize text-[#1a7f2a]">
                    {order.status}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="text-[#5f5952]">
                    {parseCustomerName(order)}
                  </span>
                  <span className="text-lg font-bold text-[#1f1b18]">
                    ₦{Number(order.total_amount).toLocaleString()}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
