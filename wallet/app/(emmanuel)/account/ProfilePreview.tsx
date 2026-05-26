'use client'

import { useState, useEffect } from 'react'
import SectionCard from './SectionCard'

export default function ProfilePreview() {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    bio: 'E-commerce enthusiast and admin of Vale Platform',
    avatar: '',
  })

  useEffect(() => {
    const stored = localStorage.getItem('profileData')
    if (stored) {
      const data = JSON.parse(stored)
      setProfile({
        fullName: data.fullName,
        bio: data.bio,
        avatar: data.avatar,
      })
    }
  }, [])

  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900">Profile Preview</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        This is how your profile will appear to other users
      </p>

      <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar || 'https://i.pravatar.cc/150?img=68'}
            alt={profile.fullName}
            className="rounded-full object-cover w-[56px] h-[56px]"
          />
          <div>
            <p className="font-semibold text-gray-900">{profile.fullName}</p>
            <p className="text-sm text-gray-500">{profile.bio}</p>
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