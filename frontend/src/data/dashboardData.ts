//Stats Cards Data
export const statsData = [
  {
    id: "products",
    label: "Total Products",
    value: "450",
    change: "+12%",
    positive: true,
    icon: "box",
    color: "#4caf43",
    bg: "#e8f5e5",
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "1,290",
    change: "+18%",
    positive: true,
    icon: "cart",
    color: "#2196f3",
    bg: "#e3f2fd",
  },
  {
    id: "customers",
    label: "Total Customers",
    value: "850",
    change: "+7%",
    positive: true,
    icon: "users",
    color: "#ff9800",
    bg: "#fff3e0",
  },
  {
    id: "revenue",
    label: "Total Revenue",
    value: "₦1.5M",
    change: "+22%",
    positive: true,
    icon: "money",
    color: "#9c27b0",
    bg: "#f3e5f5",
  },
];

//Sales Chart Data 
export const salesChartData = [
  { day: "Mon", thisWeek: 150000, lastWeek: 120000 },
  { day: "Tue", thisWeek: 220000, lastWeek: 180000 },
  { day: "Wed", thisWeek: 190000, lastWeek: 210000 },
  { day: "Thu", thisWeek: 310000, lastWeek: 250000 },
  { day: "Fri", thisWeek: 280000, lastWeek: 220000 },
  { day: "Sat", thisWeek: 350000, lastWeek: 300000 },
  { day: "Sun", thisWeek: 390000, lastWeek: 320000 },
];

//Recent Orders
export const recentOrders = [
  { id: "#ORD-00179", customer: "John Doe", date: "May 26, 2024", amount: "₦25,000", status: "completed" },
  { id: "#ORD-00128", customer: "Jane Smith", date: "May 26, 2024", amount: "₦13,500", status: "pending" },
  { id: "#ORD-00117", customer: "Mike Johnson", date: "May 26, 2024", amount: "₦32,050", status: "confirmed" },
  { id: "#ORD-00128", customer: "Sarah Williams", date: "May 25, 2024", amount: "₦12,036", status: "pending" },
  { id: "#ORD-00125", customer: "David Brown", date: "May 25, 2024", amount: "₦44,750", status: "cancelled" },
];

//Top Products
export const topProducts = [
  { id: 1, name: "Jade Wireless Headphone", price: "₦25,600", sold: 123, icon: "🎧", color: "#4caf43" },
  { id: 2, name: "Jade Smart Watch", price: "₦45,000", sold: 98, icon: "⌚", color: "#2196f3" },
  { id: 3, name: "Jade Earbuds Pro", price: "₦15,000", sold: 75, icon: "🎵", color: "#ff9800" },
  { id: 4, name: "Jade Laptop Bag", price: "₦10,000", sold: 60, icon: "💼", color: "#9c27b0" },
];

//Recent Activities
export const recentActivities = [
  { id: 1, type: "order", message: "John Doe placed a new order #ORD-0D29", time: "2 mins ago", icon: "order" },
  { id: 2, type: "product", message: 'New product "Jade Wireless Headphone" was added', time: "1 hour ago", icon: "product" },
  { id: 3, type: "payment", message: "Payment of ₦25,000 received from Jane Smith", time: "3 hours ago", icon: "payment" },
  { id: 4, type: "user", message: "Mike Johnson registered a new account", time: "6 hours ago", icon: "user" },
];