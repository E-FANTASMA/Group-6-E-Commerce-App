// app/(emmanuel)/account/TransactionsCard.tsx

import SectionCard from './SectionCard'

const months = [
  { month: 'Jan', height: 42, active: false },
  { month: 'Feb', height: 26, active: false },
  { month: 'Mar', height: 35, active: false },
  { month: 'Apr', height: 31, active: false },
  { month: 'May', height: 44, active: true },
  { month: 'Jun', height: 0, active: false },
  { month: 'Jul', height: 0, active: false },
  { month: 'Aug', height: 0, active: false },
  { month: 'Sep', height: 0, active: false },
  { month: 'Oct', height: 0, active: false },
  { month: 'Nov', height: 0, active: false },
  { month: 'Dec', height: 0, active: false },
]

export default function TransactionsCard() {
  return (
    <SectionCard>
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-900">Total Transactions</h2>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          +16%
        </span>
      </div>

      <p className="text-4xl font-bold text-red-600">1,486</p>
      <p className="text-sm text-gray-500 mt-1 mb-4">across all time</p>

      {/* Bar chart */}
      <div className="flex items-end gap-1 h-11">
        {months.map((item) => (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
            {item.height > 0 ? (
              <div
                style={{ height: `${item.height}px` }}
                className={`w-full rounded-t-sm ${
                  item.active ? 'bg-red-600' : 'bg-red-200'
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
        {months.map((item) => (
          <div key={item.month} className="flex-1 text-center">
            <span className="text-[10px] text-gray-400">{item.month}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}