export default function ContinueButton() {
  return (
    <button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
      Continue to Payment
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  )
}