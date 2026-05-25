
import SectionCard from './SectionCard'

const transactions = [
  {
    id: 1,
    type: 'Wallet Funding',
    date: 'May 11, 2026 • 10:13 AM',
    amount: '20,000',
    positive: true,
  },
  {
    id: 2,
    type: 'Store Payment',
    date: 'May 9, 2026 • 7:18 PM',
    amount: '65,000',
    positive: false,
  },
  {
    id: 3,
    type: 'Wallet Funding',
    date: 'May 2, 2026 • 5:42 PM',
    amount: '5,000',
    positive: true,
  },
  {
    id: 4,
    type: 'Store Payment',
    date: 'April 21, 2026 • 10:42 PM',
    amount: '160,000',
    positive: false,
  },
  {
    id: 5,
    type: 'Wallet Funding',
    date: 'April 9, 2026 • 08:11 AM',
    amount: '450,000',
    positive: true,
  },
]

export default function RecentTransactions() {
  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h2>

      <div className="flex flex-col divide-y divide-gray-100">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.positive ? 'bg-green-100' : 'bg-purple-100'}`}>
                {tx.positive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{tx.type}</p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>
            </div>
            <span className={`text-sm font-bold ${tx.positive ? 'text-green-600' : 'text-red-600'}`}>
              {tx.positive ? '+' : '-'} {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}