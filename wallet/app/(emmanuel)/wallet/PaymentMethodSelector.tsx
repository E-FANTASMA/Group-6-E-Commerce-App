
const methods = [
  {
    id: 'bank',
    title: 'Bank Transfer',
    description: 'Transfer from your bank account to fund wallet',
    duration: '1-5 mins',
  },
  {
    id: 'card',
    title: 'Debit Card',
    description: 'Fund your wallet instantly using your debit card',
    duration: '5-10 mins',
  },
  {
    id: 'usdt',
    title: 'USDT',
    description: 'Fund your wallet using crypto',
    duration: '1-5 mins',
  },
]

export default function PaymentMethodSelector() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-6 h-6 rounded-full border border-gray-400 text-xs flex items-center justify-center font-semibold text-gray-600">
          2
        </span>
        <h3 className="text-sm font-semibold text-gray-800">Select Payment Method</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <p className="font-semibold text-sm text-gray-900 mb-1">{method.title}</p>
            <p className="text-xs text-gray-500 mb-3">{method.description}</p>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {method.duration}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}