import { getAuthToken } from "./auth";
import { apiRequest } from "./http";

export type Order = {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  shipping_address: string;
  items?: Array<{
    id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    product_name?: string;
  }>;
};

type OrdersResponse = {
  success: boolean;
  data: Order[];
  message?: string;
};

export async function fetchOrders() {
  return apiRequest<OrdersResponse>("/api/orders", { token: getAuthToken() });
}

export function parseCustomerName(order: Order) {
  try {
    const address = JSON.parse(order.shipping_address);
    return address.fullName || address.name || "Unknown Customer";
  } catch {
    return "Unknown Customer";
  }
}

export function parseCustomerEmail(order: Order) {
  try {
    const address = JSON.parse(order.shipping_address);
    return address.email || "";
  } catch {
    return "";
  }
}

export function countItemsSold(orders: Order[]) {
  return orders.reduce((total, order) => {
    const items = order.items || [];
    return total + items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  }, 0);
}
