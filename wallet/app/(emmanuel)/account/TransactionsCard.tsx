'use client'

import { useState } from 'react'

const monthlyData = [
  { month: 'Jan', height: 42, count: 98, funding: 60, store: 38 },
  { month: 'Feb', height: 26, count: 62, funding: 40, store: 22 },
  { month: 'Mar', height: 35, count: 84, funding: 50, store: 34 },
  { month: 'Apr', height: 31, count: 74, funding: 45, store: 29 },
  { month: 'May', height: 44, count: 112, funding: 70, store: 42 },
  { month: 'Jun', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Jul', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Aug', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Sep', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Oct', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Nov', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Dec', height: 0, count: 0, funding: 0, store: 0 },
]

const weeklyData = [
  { month: 'Wk1', height: 30, count: 28, funding: 18, store: 10 },
  { month: 'Wk2', height: 44, count: 42, funding: 28, store: 14 },
  { month: 'Wk3', height: 35, count: 32, funding: 20, store: 12 },
  { month: 'Wk4', height: 25, count: 24, funding: 15, store: 9 },
]

export default function TransactionsCard() {
  const [view, setView] = useState<'monthly' | 'weekly'>('monthly')
  const [tooltip, setTooltip] = useState<number | null>(null)
  const [breakdown, setBreakdown] = useState<number | null>(null)

  const data = view === 'monthly' ? monthlyData : weeklyData
  const activeData = data.filter((d) => d.count > 0)
  const bestMonth = activeData.reduce((a, b) => (a.count > b.count ? a : b), activeData[0])
  const thisMonth = monthlyData[4]

  return (
    <div className="bg-white rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-900">Total Transactions</h2>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          +16%
        </span>
      </div>

      {/* Stats */}
      <p className="text-4xl font-bold text-red-600">1,486</p>
      <p className="text-sm text-gray-500 mt-1">across all time</p>

      {/* This month + best month */}
      <div className="flex gap-4 mt-3 mb-4">
        <div className="bg-red-50 rounded-lg px-3 py-2 flex-1">
          <p className="text-xs text-gray-500">This month</p>
          <p className="text-sm font-bold text-red-600">{thisMonth.count} transactions</p>
        </div>
        <div className="bg-green-50 rounded-lg px-3 py-2 flex-1">
          <p className="text-xs text-gray-500">Best month</p>
          <p className="text-sm font-bold text-green-600">{bestMonth?.month} ({bestMonth?.count})</p>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setView('monthly'); setBreakdown(null) }}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
            view === 'monthly' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => { setView('weekly'); setBreakdown(null) }}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
            view === 'weekly' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          Weekly
        </button>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1 h-11 relative">
        {data.map((item, index) => (
          <div
            key={item.month}
            className="flex-1 flex flex-col items-center relative"
            onMouseEnter={() => item.count > 0 && setTooltip(index)}
            onMouseLeave={() => setTooltip(null)}
            onClick={() => item.count > 0 && setBreakdown(breakdown === index ? null : index)}
          >
            {/* Tooltip */}
            {tooltip === index && item.count > 0 && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                {item.count} transactions
              </div>
            )}

            {item.height > 0 ? (
              <div
                style={{ height: `${item.height}px` }}
                className={`w-full rounded-t-sm cursor-pointer transition-all ${
                  breakdown === index
                    ? 'bg-red-800'
                    : item.month === bestMonth?.month
                    ? 'bg-red-600'
                    : 'bg-red-200'
                }`}
              />
            ) : (
              <div className="w-full border-t-2 border-dashed border-gray-300 mt-auto" />
            )}
          </div>
        ))}
      </div>

      {/* Month labels */}
      <div className="flex gap-1 mt-2">
        {data.map((item) => (
          <div key={item.month} className="flex-1 text-center">
            <span className="text-[10px] text-gray-400">{item.month}</span>
          </div>
        ))}
      </div>

      {/* Breakdown panel */}
      {breakdown !== null && data[breakdown].count > 0 && (
        <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm font-bold text-gray-800 mb-3">
            {data[breakdown].month} Breakdown
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs text-gray-600">Wallet Funding</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{data[breakdown].funding}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full"
                style={{ width: `${(data[breakdown].funding / data[breakdown].count) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-xs text-gray-600">Store Payments</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{data[breakdown].store}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-purple-500 h-1.5 rounded-full"
                style={{ width: `${(data[breakdown].store / data[breakdown].count) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}