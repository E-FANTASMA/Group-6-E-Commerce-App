import DashboardLayout from "@/src/components/layout/DashboardLayout";




export default function DashboardPage() {
  return (
    <DashboardLayout>
     
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>
      
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <p className="text-gray-400 text-sm">Dashboard content coming soon...</p>
      </div>
    </DashboardLayout>  
  );
}