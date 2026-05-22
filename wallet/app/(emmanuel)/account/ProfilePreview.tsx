import SectionCard from './SectionCard'

export default function ProfilePreview() {
  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900">Profile Preview</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        This is how your profile will appear to other users
      </p>

      <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/150?img=68"
            alt="John Doe"
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">John Doe</p>
            <p className="text-sm text-gray-500">
              E-commerce enthusiast and admin of Vale Platform
            </p>
          </div>
        </div>

        <div className="flex gap-8 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Member since</span>
            <span className="font-semibold text-gray-900 flex items-center gap-1">
              📅 Jan, 2025
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Total transactions</span>
            <span className="font-bold text-gray-900">1,486</span>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}