

import { ReactNode } from 'react'

interface PageLayoutProps {
  left: ReactNode
  right: ReactNode
}

export default function PageLayout({ left, right }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-[1fr_340px] gap-6">
          <div className="flex flex-col gap-6">{left}</div>
          <div className="flex flex-col gap-6">{right}</div>
        </div>
      </div>
    </div>
  )
}