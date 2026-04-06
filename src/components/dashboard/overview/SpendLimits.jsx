import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { PanelCard } from '../../shared/PanelCard'
import { Modal } from '../../shared/Modal'
import { useEffect, useState } from 'react'

function limitPercent(limit) {
  if (!limit.total) return 0
  return Math.round((limit.used / limit.total) * 100)
}

function LimitBar({ label, limit, currency, formatCurrency }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const percent = limitPercent(limit)
  const tone = 'from-[#224f8f] to-[#97e97a]'

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <p className="m-0 text-[0.86rem] font-semibold text-[#27357a]">{label}</p>
        <p className="m-0 text-[0.84rem] font-bold text-[#4f5f97]">{percent}%</p>
      </div>
      <div className="h-2 rounded-full bg-[#ebeffa]" role="presentation">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${tone} transition-[width] duration-1000 ease-out`} 
          style={{ width: isVisible ? `${percent}%` : '0%' }}
        ></div>
      </div>
      <p className="m-0 text-[0.78rem] text-[#6676ad]">
        {formatCurrency(limit.used, currency)} of {formatCurrency(limit.total, currency)} spent
      </p>
    </div>
  )
}

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

      <Modal
        open={isModalOpen}
        title="Edit limits"
        onClose={() => setIsModalOpen(false)}
        actions={
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-full border border-[#dfe6fb] bg-white px-3 py-1 text-[0.75rem] font-bold text-[#4f67c8]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveModal}
              className="rounded-full bg-[#4f67c8] px-3 py-1 text-[0.75rem] font-bold text-white"
            >
              Save
            </button>
          </>
        }
      >
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
              Daily used
              <input
                type="number"
                min="0"
                value={draft.dailyUsed}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, dailyUsed: event.target.value }))
                }
                className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem] text-[#2b3f85] shadow-sm"
              />
            </label>
            <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
              Daily total
              <input
                type="number"
                min="0"
                value={draft.dailyTotal}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, dailyTotal: event.target.value }))
                }
                className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem] text-[#2b3f85] shadow-sm"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
              Monthly used
              <input
                type="number"
                min="0"
                value={draft.monthlyUsed}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, monthlyUsed: event.target.value }))
                }
                className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem] text-[#2b3f85] shadow-sm"
              />
            </label>
            <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
              Monthly total
              <input
                type="number"
                min="0"
                value={draft.monthlyTotal}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, monthlyTotal: event.target.value }))
                }
                className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem] text-[#2b3f85] shadow-sm"
              />
            </label>
          </div>
        </div>
      </Modal>
    </PanelCard>
  )
}
