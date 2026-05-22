// components/account-settings/PersonalInfoForm.tsx


import SectionCard from './SectionCard'

export default function PersonalInfoForm() {
  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Update your personal information and how others see you.
      </p>

      <div className="flex gap-8">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 min-w-30">
          <img
            src="https://i.pravatar.cc/150?img=68"
            alt="John Doe"
            width={90}
            height={90}
            className="rounded-full object-cover"
          />
          <p className="font-semibold text-sm text-gray-900">John Doe</p>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Admin
          </span>
          <p className="text-xs text-gray-500">johndoe@example.com</p>
          <p className="text-xs text-gray-500">+2348039103671</p>
        </div>

        {/* Form fields */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              defaultValue="johndoe@example.com"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              defaultValue="+2348039103671"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="text"
              defaultValue="May 15, 1985"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              defaultValue="E-commerce enthusiast and admin of Vale Platform"
              rows={3}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500 resize-none"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-2">
            <button className="px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}