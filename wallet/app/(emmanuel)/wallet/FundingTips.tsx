
import SectionCard from './SectionCard'

const tips = [
  'Use debit card for instant funding',
  'Bank transfers may take 1-5 mins to reflect',
  'Ensure you use an account in your name',
]

export default function FundingTips() {
  return (
    <SectionCard>
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h2 className="text-sm font-bold text-gray-900">Funding Tips</h2>
      </div>

      <div className="flex flex-col gap-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mt-0.5 flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <p className="text-sm text-gray-600">{tip}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}