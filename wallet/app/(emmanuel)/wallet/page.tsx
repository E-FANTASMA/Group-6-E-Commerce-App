
import PageHeader from './PageHeader'
import BalanceBanner from './BalanceBanner'
import AmountInput from './AmountInput'
import PaymentMethodSelector from './PaymentMethodSelector'
import ContinueButton from './ContinueButton'
import RecentTransactions from './RecentTransactions'
import FundingTips from './FundingTips'
import SecurityBadge from './SecurityBadge'

export default function WalletFundingPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <PageHeader />
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr_340px] gap-6">
        <div className="flex flex-col">
          <div className="bg-white rounded-2xl p-6">
            <h1 className="text-3xl font-bold text-gray-900">Fund Wallet</h1>
            <p className="text-sm text-gray-500 mt-1 mb-6">
              Seamless funding. Limitless shopping.
            </p>
            <BalanceBanner />
            <AmountInput />
            <PaymentMethodSelector />
            <ContinueButton />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <RecentTransactions />
          <FundingTips />
          <SecurityBadge />
        </div>
      </div>
    </div>
  )
}