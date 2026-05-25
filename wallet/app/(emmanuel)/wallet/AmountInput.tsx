'use client'

import { useState } from 'react'

const quickAmounts = [5000, 10000, 15000, 20000, 50000]

export default function AmountInput() {
  const [amount, setAmount] = useState('')

  const handleQuickAmount = (value: number) => {
    const current = parseFloat(amount.replace(/,/g, '')) || 0
    const newAmount = current + value
    setAmount(newAmount.toLocaleString())
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full border border-gray-400 text-xs flex items-center justify-center font-semibold text-gray-600">
          1
        </span>
        <h3 className="text-sm font-semibold text-gray-800">Enter Amount</h3>
      </div>

      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden mb-3">
        <span className="px-4 py-3 text-gray-500 font-bold border-r border-gray-200">
          ₦
        </span>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter your funding amount.."
          className="flex-1 px-4 py-3 text-sm outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {quickAmounts.map((value) => (
          <button
            key={value}
            onClick={() => handleQuickAmount(value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
          >
            {value.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  )
}