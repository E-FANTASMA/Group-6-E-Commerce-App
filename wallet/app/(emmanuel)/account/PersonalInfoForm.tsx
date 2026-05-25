'use client'

import { useState, useEffect } from 'react'
import SectionCard from './SectionCard'

const defaultData = {
  fullName: 'John Doe',
  email: 'johndoe@example.com',
  phone: '+2348039103671',
  dob: 'May 15, 1985',
  bio: 'E-commerce enthusiast and admin of Vale Platform',
}

export default function PersonalInfoForm() {
  const [form, setForm] = useState(defaultData)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('profileData')
    if (stored) setForm(JSON.parse(stored))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem('profileData', JSON.stringify(form))
    setSaved(true)
  }

  const handleCancel = () => {
    const stored = localStorage.getItem('profileData')
    if (stored) setForm(JSON.parse(stored))
    else setForm(defaultData)
    setSaved(false)
  }

  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Update your personal information and how others see you.
      </p>

      <div className="flex gap-8">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 min-w-[120px]">
          <img
            src="https://i.pravatar.cc/150?img=68"
            alt="John Doe"
            width={90}
            height={90}
            className="rounded-full object-cover"
          />
          <p className="font-semibold text-sm text-gray-900">{form.fullName}</p>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Admin
          </span>
          <p className="text-xs text-gray-500">{form.email}</p>
          <p className="text-xs text-gray-500">{form.phone}</p>
        </div>

        {/* Form fields */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="text"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500 resize-none"
            />
          </div>

          <div className="col-span-2 flex justify-end items-center gap-3 mt-2">
            {saved && (
              <span className="text-sm text-green-600 font-medium">Changes saved!</span>
            )}
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}