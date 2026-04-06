import { useState } from 'react'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { PanelCard } from '../../shared/PanelCard'
import { LimitBar } from './LimitBar'
import { SpendLimitsModal } from './SpendLimitsModal'

export function SpendLimits({ account, formatCurrency, role, onUpdateLimit }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [draft, setDraft] = useState({
    dailyUsed: account.dailyLimit.used,
    dailyTotal: account.dailyLimit.total,
    monthlyUsed: account.monthlyLimit.used,
    monthlyTotal: account.monthlyLimit.total,
  })

  const openModal = () => {
    setDraft({
      dailyUsed: account.dailyLimit.used,
      dailyTotal: account.dailyLimit.total,
      monthlyUsed: account.monthlyLimit.used,
      monthlyTotal: account.monthlyLimit.total,
    })
    setIsModalOpen(true)
  }

  const saveModal = () => {
    onUpdateLimit('dailyLimit', {
      used: Number(draft.dailyUsed || 0),
      total: Number(draft.dailyTotal || 0),
    })
    onUpdateLimit('monthlyLimit', {
      used: Number(draft.monthlyUsed || 0),
      total: Number(draft.monthlyTotal || 0),
    })
    setIsModalOpen(false)
  }

  return (
    <PanelCard className="h-full" contentClassName="grid h-full content-start gap-4" aria-label="Spending limits">
      <SectionPanelHeader
        title="Spend Limits"
        actionLabel={role === 'Admin' ? 'Edit limits' : 'This month'}
        onAction={role === 'Admin' ? openModal : undefined}
      />

      <div className="grid grid-cols-1 gap-3 max-[720px]:grid-cols-1">
        <LimitBar
          label="Daily limit"
          limit={account.dailyLimit}
          currency={account.currency}
          formatCurrency={formatCurrency}
        />
        <LimitBar
          label="Monthly limit"
          limit={account.monthlyLimit}
          currency={account.currency}
          formatCurrency={formatCurrency}
        />
      </div>

      <SpendLimitsModal
        open={isModalOpen}
        draft={draft}
        setDraft={setDraft}
        onClose={() => setIsModalOpen(false)}
        onSave={saveModal}
      />
    </PanelCard>
  )
}
