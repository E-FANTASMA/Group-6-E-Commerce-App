// app/(emmanuel)/account/HelpSupport.tsx

import SectionCard from './SectionCard'

export default function HelpSupport() {
  return (
    <SectionCard>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-900">Help & support</h2>
          <p className="text-sm text-gray-500">Need help with your account?</p>
          <p className="text-sm text-gray-500">Our support team is here to help.</p>

          <button className="mt-2 flex items-center gap-2 bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-800 w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contact Support
          </button>
        </div>

        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0;">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>
    </SectionCard>
  )
}