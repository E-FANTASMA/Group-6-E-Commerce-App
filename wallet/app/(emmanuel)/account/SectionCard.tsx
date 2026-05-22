
import { ReactNode } from 'react'

interface SectionCardProps {
  children: ReactNode
  className?: string
}

export default function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}