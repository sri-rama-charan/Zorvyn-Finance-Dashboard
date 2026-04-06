import { Modal } from '../../shared/Modal'

export function SummaryEditModal({ open, summaryDraft, setSummaryDraft, onClose, onSave }) {
  return (
    <Modal
      open={open}
      title="Edit summary"
      onClose={onClose}
      actions={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#dfe6fb] bg-white px-3 py-1 text-[0.75rem] font-bold text-[#4f67c8]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
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
            Balance
            <input
              type="number"
              min="0"
              value={summaryDraft.balance}
              onChange={(event) =>
                setSummaryDraft((prev) => ({ ...prev, balance: event.target.value }))
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
            />
          </label>
          <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
            Balance delta
            <input
              value={summaryDraft.balanceDelta}
              onChange={(event) =>
                setSummaryDraft((prev) => ({ ...prev, balanceDelta: event.target.value }))
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
            Income
            <input
              type="number"
              min="0"
              value={summaryDraft.income}
              onChange={(event) =>
                setSummaryDraft((prev) => ({ ...prev, income: event.target.value }))
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
            />
          </label>
          <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
            Income delta
            <input
              value={summaryDraft.incomeDelta}
              onChange={(event) =>
                setSummaryDraft((prev) => ({ ...prev, incomeDelta: event.target.value }))
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
            Expenses
            <input
              type="number"
              min="0"
              value={summaryDraft.expenses}
              onChange={(event) =>
                setSummaryDraft((prev) => ({ ...prev, expenses: event.target.value }))
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
            />
          </label>
          <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
            Expenses delta
            <input
              value={summaryDraft.expensesDelta}
              onChange={(event) =>
                setSummaryDraft((prev) => ({ ...prev, expensesDelta: event.target.value }))
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
            Savings
            <input
              type="number"
              min="0"
              value={summaryDraft.savings}
              onChange={(event) =>
                setSummaryDraft((prev) => ({ ...prev, savings: event.target.value }))
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
            />
          </label>
          <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
            Savings delta
            <input
              value={summaryDraft.savingsDelta}
              onChange={(event) =>
                setSummaryDraft((prev) => ({ ...prev, savingsDelta: event.target.value }))
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
            />
          </label>
        </div>
        <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
          Card number
          <input
            value={summaryDraft.cardNumber}
            onChange={(event) =>
              setSummaryDraft((prev) => ({ ...prev, cardNumber: event.target.value }))
            }
            className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
          />
        </label>
      </div>
    </Modal>
  )
}
