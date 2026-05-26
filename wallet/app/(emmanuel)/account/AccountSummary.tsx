'use client'

import { useState, useEffect } from 'react'

const loginHistory = [
  { date: 'May 26, 2026', device: 'Chrome • Windows' },
  { date: 'May 22, 2026', device: 'Safari • iPhone' },
  { date: 'May 18, 2026', device: 'Chrome • Windows' },
]

export default function AccountSummary() {
  const [showHistory, setShowHistory] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [securityScore, setSecurityScore] = useState(0)
  const [showScoreTips, setShowScoreTips] = useState(false)

  useEffect(() => {
    // Session timer
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 60000)

    // Security score based on localStorage profile
    const stored = localStorage.getItem('profileData')
    if (stored) {
      const data = JSON.parse(stored)
      let score = 40
      if (data.fullName) score += 10
      if (data.email) score += 15
      if (data.phone) score += 15
      if (data.bio) score += 10
      if (data.avatar) score += 10
      setSecurityScore(score)
    } else {
      setSecurityScore(40)
    }

    return () => clearInterval(timer)
  }, [])

  const formatSession = () => {
    if (sessionTime < 1) return 'Just started'
    if (sessionTime === 1) return 'Active for 1 min'
    return `Active for ${sessionTime} mins`
  }

  const scoreColor = securityScore >= 80 ? 'bg-green-500' : securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
  const scoreLabel = securityScore >= 80 ? 'Strong' : securityScore >= 60 ? 'Fair' : 'Weak'
  const scoreTextColor = securityScore >= 80 ? 'text-green-600' : securityScore >= 60 ? 'text-yellow-600' : 'text-red-600'

  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Account Summary</h2>

      <div className="flex flex-col gap-4">
        {/* Account Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account Type
          </div>
          <span className="text-sm font-bold text-gray-900">Administrator</span>
        </div>

        {/* Account Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Account Status
          </div>
          <span className="flex items-center gap-1 text-sm font-bold text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Active
          </span>
        </div>

        {/* Last Login */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last Login
          </div>
          <span className="text-sm font-bold text-gray-900">Today</span>
        </div>

        {/* Member Since */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Member Since
          </div>
          <span className="text-sm font-bold text-gray-900">Jan, 2025</span>
        </div>

        {/* Session Timer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Session
          </div>
          <span className="text-sm font-bold text-green-600">{formatSession()}</span>
        </div>

        {/* Login History */}
        <div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs text-green-700 font-semibold hover:underline"
          >
            {showHistory ? 'Hide login history' : 'View login history'}
          </button>
          {showHistory && (
            <div className="mt-2 flex flex-col gap-2">
              {loginHistory.map((log, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-600">{log.device}</span>
                  <span className="text-xs text-gray-400">{log.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security Score */}
        <div className="border-t border-gray-100 pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowScoreTips(!showScoreTips)}
          >
            <span className="text-sm text-gray-600 font-medium">Security Score</span>
            <span className={`text-sm font-bold ${scoreTextColor}`}>{securityScore}% • {scoreLabel}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`${scoreColor} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${securityScore}%` }}
            />
          </div>
          {showScoreTips && (
            <div className="mt-3 flex flex-col gap-2">
              {[
                { label: 'Profile photo added', done: true },
                { label: 'Phone number added', done: true },
                { label: 'Bio completed', done: true },
                { label: 'Two-factor authentication', done: false },
                { label: 'Email verified', done: false },
              ].map((tip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${tip.done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {tip.done ? '✓' : '○'}
                  </span>
                  <span className={`text-xs ${tip.done ? 'text-gray-700' : 'text-gray-400'}`}>{tip.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}