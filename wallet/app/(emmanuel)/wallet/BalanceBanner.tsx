// app/(emmanuel)/wallet/BalanceBanner.tsx

export default function BalanceBanner() {
  return (
    <div className="relative bg-green-900 rounded-2xl p-8 overflow-hidden mb-6">
      <div className="absolute inset-0 opacity-20 bg-cover bg-center" />

      <div className="relative z-10">
        <p className="text-green-300 text-sm font-medium mb-2">Available Balance</p>
        <div className="flex items-center gap-3">
          <h2 className="text-white text-4xl font-bold tracking-tight">
            NGN 250,000.00
          </h2>
          <button className="text-green-300 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}