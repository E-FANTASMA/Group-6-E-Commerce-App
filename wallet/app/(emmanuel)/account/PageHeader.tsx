'use client'

import { useState, useEffect } from 'react'

export default function PageHeader() {
  const [profile, setProfile] = useState({ fullName: 'John Doe', avatar: '' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('profileData')
    if (stored) {
      const data = JSON.parse(stored)
      setProfile({ fullName: data.fullName, avatar: data.avatar })
    }
    setMounted(true)

    const handleStorage = () => {
      const updated = localStorage.getItem('profileData')
      if (updated) {
        const data = JSON.parse(updated)
        setProfile({ fullName: data.fullName, avatar: data.avatar })
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile and security</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <img
            src={!mounted ? '' : (profile.avatar || 'https://i.pravatar.cc/150?img=68')}
            alt={profile.fullName}
            className={`rounded-full object-cover w-[40px] h-[40px] transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          />
          <span className="font-medium text-gray-900">{profile.fullName}</span>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Admin</span>
        </div>
      </div>
    </div>
  )
}