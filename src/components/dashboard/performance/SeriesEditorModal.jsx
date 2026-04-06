import { Modal } from '../../shared/Modal'

export function SeriesEditorModal({ open, seriesDraft, setSeriesDraft, onClose, onSave }) {
  return (
    <Modal
      open={open}
      title="Edit monthly series"
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
      <div className="grid gap-2">
        {seriesDraft.map((item, index) => (
          <div key={item.month} className="grid grid-cols-[auto_1fr_1fr] items-center gap-2">
            <span className="text-[0.75rem] font-semibold text-[#5b6fa7]">{item.month}</span>
            <input
              type="number"
              min="0"
              value={item.income}
              onChange={(event) =>
                setSeriesDraft((prev) =>
                  prev.map((entry, i) =>
                    i === index ? { ...entry, income: event.target.value } : entry,
                  ),
                )
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
              placeholder="Income"
            />
            <input
              type="number"
              min="0"
              value={item.expenses}
              onChange={(event) =>
                setSeriesDraft((prev) =>
                  prev.map((entry, i) =>
                    i === index ? { ...entry, expenses: event.target.value } : entry,
                  ),
                )
              }
              className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem]"
              placeholder="Expenses"
            />
          </div>
        ))}
      </div>
    </Modal>
  )
}
