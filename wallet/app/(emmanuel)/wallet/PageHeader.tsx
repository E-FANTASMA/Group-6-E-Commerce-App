// app/(emmanuel)/wallet/PageHeader.tsx

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <p className="text-xl font-bold text-gray-700">Welcome back!</p>
      <h1 style={{ fontFamily: 'var(--font-plaster)', fontSize: '50px', lineHeight: '1' }}>
        <span style={{ color: '#4E8A66' }}>V</span>
        <span style={{ color: '#DCCFC0' }}>a</span>
        <span style={{ color: '#4E8A66' }}>l</span>
        <span style={{ color: '#DCCFC0' }}>e</span>
      </h1>
    </div>
  )
}