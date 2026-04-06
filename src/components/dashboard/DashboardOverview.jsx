import { useState } from 'react'
import { BalanceCard } from './overview/BalanceCard'
import { OverviewKpis } from './overview/OverviewKpis'
import { SpendLimits } from './overview/SpendLimits'
import { SummaryEditModal } from './overview/SummaryEditModal'

export function DashboardOverview({
  account,
  formatCurrency,
  formatSignedPercent,
  role,
  onUpdateLimit,
  onUpdateAccount,
}) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [summaryDraft, setSummaryDraft] = useState({
    balance: account.balance,
    balanceDelta: account.balanceDelta,
    income: account.income,
    incomeDelta: account.incomeDelta,
    expenses: account.expenses,
    expensesDelta: account.expensesDelta,
    savings: account.savings,
    savingsDelta: account.savingsDelta,
    cardNumber: account.cardNumber,
  })

  const openSummaryModal = () => {
    setSummaryDraft({
      balance: account.balance,
      balanceDelta: account.balanceDelta,
      income: account.income,
      incomeDelta: account.incomeDelta,
      expenses: account.expenses,
      expensesDelta: account.expensesDelta,
      savings: account.savings,
      savingsDelta: account.savingsDelta,
      cardNumber: account.cardNumber,
    })
    setIsSummaryOpen(true)
  }

  const saveSummary = () => {
    if (!onUpdateAccount) return
    onUpdateAccount({
      balance: Number(summaryDraft.balance || 0),
      balanceDelta: summaryDraft.balanceDelta,
      income: Number(summaryDraft.income || 0),
      incomeDelta: summaryDraft.incomeDelta,
      expenses: Number(summaryDraft.expenses || 0),
      expensesDelta: summaryDraft.expensesDelta,
      savings: Number(summaryDraft.savings || 0),
      savingsDelta: summaryDraft.savingsDelta,
      cardNumber: summaryDraft.cardNumber,
    })
    setIsSummaryOpen(false)
  }
  return (
    <section className="grid gap-3 xl:grid-cols-[minmax(0,2.3fr)_minmax(320px,1fr)] max-[1040px]:grid-cols-1" aria-label="Financial overview">
      <div className="grid items-stretch gap-3 [grid-template-columns:clamp(290px,28vw,340px)_minmax(0,1fr)] max-[1040px]:grid-cols-1" aria-label="Financial summary cards">
        <BalanceCard
          account={account}
          formatCurrency={formatCurrency}
          role={role}
          onEditSummary={role === 'Admin' ? openSummaryModal : undefined}
        />
        <OverviewKpis
          account={account}
          formatCurrency={formatCurrency}
          formatSignedPercent={formatSignedPercent}
        />
      </div>

      <SpendLimits account={account} formatCurrency={formatCurrency} role={role} onUpdateLimit={onUpdateLimit} />

      <SummaryEditModal
        open={isSummaryOpen}
        summaryDraft={summaryDraft}
        setSummaryDraft={setSummaryDraft}
        onClose={() => setIsSummaryOpen(false)}
        onSave={saveSummary}
      />
    </section>
  )
}
