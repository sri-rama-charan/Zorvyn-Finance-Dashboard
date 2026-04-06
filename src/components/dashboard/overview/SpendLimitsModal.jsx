import { Modal } from '../../shared/Modal'

export function SpendLimitsModal({ open, draft, setDraft, onClose, onSave }) {
  return (
    <Modal
      open={open}
      title="Edit limits"
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
  )
}
