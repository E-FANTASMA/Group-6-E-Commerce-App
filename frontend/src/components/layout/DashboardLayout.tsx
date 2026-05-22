import Sidebar from "./SideBar";
import Topbar from "./TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Topbar />
      <main
        className="pt-16 min-h-screen"
        style={{ marginLeft: "220px" }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}