'use client'

import PageLayout from './PageLayout'
import PageHeader from './PageHeader'
import PersonalInfoForm from './PersonalInfoForm'
import ProfilePreview from './ProfilePreview'
import AccountSummary from './AccountSummary'
import TransactionsCard from './TransactionsCard'
import HelpSupport from './HelpSupport'
import ChatWidget from './ChatWidget'



export default function AccountSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <PageHeader />
      <PageLayout
        left={
          <>
            <PersonalInfoForm />
            <ProfilePreview />
          </>
        }
        right={
          <>
            <AccountSummary />
            <TransactionsCard />
            <HelpSupport />
          </>
        }
      />
      <ChatWidget />
    </div>
  )
}