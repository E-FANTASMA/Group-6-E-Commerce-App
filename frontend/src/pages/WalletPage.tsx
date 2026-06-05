import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/http'
import { getAuthToken } from '../api/auth'

// ── SectionCard ──────────────────────────────────────────
function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

// ── PageHeader ───────────────────────────────────────────
function PageHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <p className="text-2xl font-bold text-gray-700">Welcome back!</p>
      <h1 style={{ fontFamily: "'Plaster', cursive", fontSize: '50px', lineHeight: '1' }}>
        <span style={{ color: '#4E8A66' }}>V</span>
        <span style={{ color: '#DCCFC0' }}>a</span>
        <span style={{ color: '#4E8A66' }}>l</span>
        <span style={{ color: '#DCCFC0' }}>e</span>
      </h1>
    </div>
  )
}

// ── BalanceBanner ────────────────────────────────────────
function BalanceBanner({ balance }: { balance: number }) {
  const [visible, setVisible] = useState(true)

  return (
    <div className="relative bg-green-900 rounded-2xl p-8 overflow-hidden mb-6 min-h-[180px]">
      <img
        src="/Onboarding.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
      />
      <img
        src="/undraw-wallet.svg"
        alt="wallet illustration"
        className="absolute right-6 bottom-0 h-[140px] w-[180px] object-contain"
      />
      <div className="relative z-10 max-w-[60%]">
        <p className="text-white text-sm font-medium mb-2">Available Balance</p>
        <div className="flex items-center gap-3">
        <h2 className="text-white text-4xl font-bold tracking-tight">
            {
              visible
                ? `NGN ${balance.toLocaleString()}`
                : 'NGN ••••••••'
            }
          </h2>
          <button onClick={() => setVisible(!visible)} className="text-white hover:text-green-300 transition-colors">
            {visible ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── AmountInput ──────────────────────────────────────────
const quickAmounts = [5000, 10000, 15000, 20000, 50000]

function AmountInput({
  amount,
  setAmount,
}: {
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
}) {

  const handleQuickAmount = (value: number) => {
    const current = parseFloat(amount.replace(/,/g, '')) || 0
    const newAmount = current + value
    setAmount(String(newAmount))
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full border border-gray-400 text-xs flex items-center justify-center font-semibold text-gray-600">1</span>
        <h3 className="text-sm font-semibold text-gray-800">Enter Amount</h3>
      </div>
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden mb-3">
        <span className="px-4 py-3 text-gray-500 font-bold border-r border-gray-200">₦</span>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter your funding amount.."
          className="flex-1 px-4 py-3 text-sm outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {quickAmounts.map((value) => (
          <button
            key={value}
            onClick={() => handleQuickAmount(value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
          >
            {value.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── PaymentMethodSelector ────────────────────────────────
const methods = [
  { id: 'bank', title: 'Bank Transfer', description: 'Transfer from your bank account to fund wallet', duration: '1-5 mins' },
  { id: 'card', title: 'Debit Card', description: 'Fund your wallet instantly using your debit card', duration: '5-10 mins' },
  { id: 'usdt', title: 'USDT', description: 'Fund your wallet using crypto', duration: '1-5 mins' },
]

function PaymentMethodSelector() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-6 h-6 rounded-full border border-gray-400 text-xs flex items-center justify-center font-semibold text-gray-600">2</span>
        <h3 className="text-sm font-semibold text-gray-800">Select Payment Method</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelected(selected === method.id ? null : method.id)}
            className={`relative border rounded-xl p-4 cursor-pointer transition-colors ${selected === method.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300 hover:bg-green-50'}`}
          >
            <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selected === method.id ? 'bg-green-600 border-green-600' : 'border-gray-300 bg-white'}`}>
              {selected === method.id && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <p className="font-semibold text-sm text-gray-900 mb-1">{method.title}</p>
            <p className="text-xs text-gray-500 mb-3">{method.description}</p>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{method.duration}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── RecentTransactions ───────────────────────────────────


function RecentTransactions({ transactions }: { transactions: any[] }) {
  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h2>
      <div className="flex flex-col divide-y divide-gray-100">
            {transactions.map((transaction) => (
        <div key={transaction.id}>
          <div>
            <strong>
              {transaction.type === 'credit'
                ? 'Wallet Funding'
                : 'Store Payment'}
            </strong>
          </div>

          <div>
            {new Date(transaction.created_at).toLocaleString()}
          </div>

          <div
            style={{
              color:
                transaction.type === 'credit'
                  ? 'green'
                  : 'red',
            }}
          >
            {transaction.type === 'credit' ? '+' : '-'}
            ₦{Number(transaction.amount).toLocaleString()}
          </div>
        </div>
      ))}
      </div>
    </SectionCard>
  )
}

// ── FundingTips ──────────────────────────────────────────
const tips = [
  'Use debit card for instant funding',
  'Bank transfers may take 1-5 mins to reflect',
  'Ensure you use an account in your name',
]

function FundingTips() {
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <p className="text-sm text-gray-600">{tip}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

// ── SecurityBadge ────────────────────────────────────────
function SecurityBadge() {
  return (
    <SectionCard>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Your Security is Our Top Priority</p>
          <p className="text-xs text-gray-500 mt-1">All transactions are secure and encrypted with 256-bit SSL.</p>
        </div>
      </div>
    </SectionCard>
  )
}

// ── Main Page ────────────────────────────────────────────
export default function WalletPage() {
  const navigate = useNavigate()
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [transactions, setTransactions] = useState<any[]>([])
  const [amount, setAmount] = useState('')
const [funding, setFunding] = useState(false)
  useEffect(() => {
    loadWallet()
    loadTransactions()
  }, [])
  
  async function loadWallet() {
    try {
      const token = getAuthToken()
  
      const result = await apiRequest<any>(
        '/api/wallet',
        {
          token,
        }
      )
  
      if (result.success) {
        setWalletBalance(
          Number(result.data.balance)
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function loadTransactions() {
    try {
      const token = getAuthToken()
  
      const result = await apiRequest<any>(
        '/api/wallet/transactions',
        {
          token,
        }
      )
  
      if (result.success) {
        setTransactions(result.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

async function fundWallet() {
  try {
    setFunding(true)

    const token = getAuthToken()

    const result = await apiRequest<any>(
      '/api/wallet/top-up',
      {
        method: 'POST',
        token,
        body: JSON.stringify({
          amount: Number(amount),
        }),
      }
    )

    if (result.success) {
      alert('Wallet funded successfully')

      await loadWallet()
      await loadTransactions()

      setAmount('')
    }
  }catch (error: any) {
  console.error(error)
  console.log(error?.details)
  alert(JSON.stringify(error?.details))
} finally {
    setFunding(false)
  }
}

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <PageHeader />
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr_340px] gap-6">
        <div>
          <div className="bg-white rounded-2xl p-6">
            <h1 className="text-3xl font-bold text-gray-900">Fund Wallet</h1>
            <p className="text-sm text-gray-500 mt-1 mb-6">Seamless funding. Limitless shopping.</p>
            <BalanceBanner balance={walletBalance} />
            <AmountInput amount={amount} setAmount={setAmount} />
            <PaymentMethodSelector />
            <button
              onClick={fundWallet}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors mt-4"
            >
              {funding ? 'Funding...' : 'Fund Wallet'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6"><RecentTransactions transactions={transactions}/>
          <FundingTips />
          <SecurityBadge />
        </div>
      </div>
    </div>
  )
}