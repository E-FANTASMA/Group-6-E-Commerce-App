import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAuthToken, clearUserData, getUserData, setUserData as persistUserData } from '../api/auth'

type UserData = {
  fullName: string
  email: string
  phoneNumber?: string
  role?: string
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-white p-6 shadow-sm">{children}</div>
}

function PageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
      <p className="mt-1 text-gray-500">Manage your account information and actions.</p>
    </div>
  )
}

function PersonalInformation({
  userData,
  onSave,
}: {
  userData: UserData
  onSave: (updates: Pick<UserData, 'email' | 'phoneNumber'>) => void
}) {
  const [form, setForm] = useState({
    email: userData.email,
    phoneNumber: userData.phoneNumber || '',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm({
      email: userData.email,
      phoneNumber: userData.phoneNumber || '',
    })
  }, [userData])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  function handleSave() {
    onSave({
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim(),
    })
    setSaved(true)
  }

  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <p className="text-sm font-medium text-gray-500">Full Name</p>
          <p className="mt-1 text-base font-semibold text-gray-900">{userData.fullName}</p>
        </div>
        <label className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <span className="text-sm font-medium text-gray-500">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-500"
          />
        </label>
        <label className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <span className="text-sm font-medium text-gray-500">Phone Number</span>
          <input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-500"
          />
        </label>
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <p className="text-sm font-medium text-gray-500">Role</p>
          <p className="mt-1 text-base font-semibold text-gray-900">{userData.role || 'User'}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-3">
        {saved && <p className="text-sm font-medium text-green-600">Changes saved.</p>}
        <button
          onClick={handleSave}
          className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800"
        >
          Save Changes
        </button>
      </div>
    </SectionCard>
  )
}

function QuickActions({ role }: { role?: string }) {
  const navigate = useNavigate()

  function logout() {
    clearAuthToken()
    clearUserData()
    navigate('/login')
  }

  const actions = [
  ...(role === 'admin'
    ? [{ label: 'Admin Dashboard', onClick: () => navigate('/admin/dashboard') }]
    : []),
    { label: 'My Orders', onClick: () => navigate('/orders') },
    { label: 'Fund Wallet', onClick: () => navigate('/wallet/fund') },
    { label: 'Back To Shop', onClick: () => navigate('/shop') },
    { label: 'Logout', onClick: logout, variant: 'danger' as const },
  ]

  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
              action.variant === 'danger'
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-green-700 text-white hover:bg-green-800'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </SectionCard>
  )
}

export default function AccountPage() {
  const navigate = useNavigate()
  const [userData, setCurrentUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authUser = getUserData()

    if (!authUser) {
      navigate('/login')
      return
    }

    setCurrentUserData(authUser)
    setLoading(false)
  }, [navigate])

  function handlePersonalInfoSave(updates: Pick<UserData, 'email' | 'phoneNumber'>) {
    if (!userData) return

    const nextUserData: UserData = {
      ...userData,
      email: updates.email || userData.email,
      phoneNumber: updates.phoneNumber || undefined,
    }

    setCurrentUserData(nextUserData)
    persistUserData(nextUserData)
  }

  if (loading || !userData) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <PageHeader />
        <div className="grid gap-6">
          <PersonalInformation userData={userData} onSave={handlePersonalInfoSave} />
          <QuickActions role={userData.role} />
        </div>
      </div>
    </div>
  )
}
