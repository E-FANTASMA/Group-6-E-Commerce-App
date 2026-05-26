'use client'

import { useState, useEffect } from 'react'
import SectionCard from './SectionCard'

const defaultData = {
  fullName: 'John Doe',
  email: 'johndoe@example.com',
  phone: '+2348039103671',
  dob: 'May 15, 1985',
  bio: 'E-commerce enthusiast and admin of Vale Platform',
  avatar: '',
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result as string }))
    }
    reader.readAsDataURL(file)
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
          <div className="relative">
            <img
              src={form.avatar || 'https://i.pravatar.cc/150?img=68'}
              alt="John Doe"
              className="rounded-full object-cover w-[90px] h-[90px]"
            />
            <label className="absolute bottom-0 right-0 w-7 h-7 bg-green-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
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