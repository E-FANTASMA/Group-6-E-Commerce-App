import Sidebar from "./SideBar";
import Topbar from "./TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f4" }}>
      <Sidebar />
      <Topbar />
      <main
        style={{
          marginLeft: "220px",
          paddingTop: "64px",
          minHeight: "100vh",
        }}
      >
        <div style={{ padding: "24px" }}>{children}</div>
      </main>
    </div>
  );
}