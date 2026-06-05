import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import {
  clearAuthToken,
  clearUserData,
  getUserData,
} from "../api/auth";

export default function SettingsPage() {
  const navigate = useNavigate();
  const user = getUserData();

  function handleLogout() {
    clearAuthToken();
    clearUserData();
    navigate("/login");
  }

  return (
    <AdminLayout
      title="Settings"
      subtitle="Manage your admin account and store preferences."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[28px] border border-[#e7dbd0] bg-white/80 p-6 shadow-sm">
          <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f1b18]">
            Admin profile
          </h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="rounded-xl border border-[#f0ebe4] bg-[#faf8f5] px-4 py-3">
              <dt className="text-[#8d8178]">Full name</dt>
              <dd className="mt-1 font-semibold text-[#1f1b18]">
                {user?.fullName || "—"}
              </dd>
            </div>
            <div className="rounded-xl border border-[#f0ebe4] bg-[#faf8f5] px-4 py-3">
              <dt className="text-[#8d8178]">Email</dt>
              <dd className="mt-1 font-semibold text-[#1f1b18]">
                {user?.email || "—"}
              </dd>
            </div>
            <div className="rounded-xl border border-[#f0ebe4] bg-[#faf8f5] px-4 py-3">
              <dt className="text-[#8d8178]">Role</dt>
              <dd className="mt-1 font-semibold capitalize text-[#1f1b18]">
                {user?.role || "admin"}
              </dd>
            </div>
            {user?.phoneNumber && (
              <div className="rounded-xl border border-[#f0ebe4] bg-[#faf8f5] px-4 py-3">
                <dt className="text-[#8d8178]">Phone</dt>
                <dd className="mt-1 font-semibold text-[#1f1b18]">
                  {user.phoneNumber}
                </dd>
              </div>
            )}
          </dl>
        </section>

        <section className="rounded-[28px] border border-[#e7dbd0] bg-white/80 p-6 shadow-sm">
          <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f1b18]">
            Store actions
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#5f5952]">
            Jump back to the storefront to preview how products appear to shoppers,
            or sign out of the admin panel securely.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="rounded-full bg-[#2d7a4f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1f4d34]"
            >
              Preview storefront
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-[#f2d6d6] bg-[#fff5f5] px-5 py-3 text-sm font-semibold text-[#b71c1c] hover:bg-[#ffebee]"
            >
              Sign out
            </button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
