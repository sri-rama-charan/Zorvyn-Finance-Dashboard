import { Modal } from '../shared/Modal'

export function TransactionEditorModal({
  open,
  modalMode,
  draft,
  setDraft,
  onClose,
  onSave,
  onDelete,
}) {
  return (
    <Modal
      open={open}
      title={modalMode === 'edit' ? 'Edit transaction' : 'Add transaction'}
      onClose={onClose}
      actions={
        <>
          {modalMode === 'edit' ? (
            <button
              type="button"
              onClick={onDelete}
              className="rounded-full border border-[rgba(192,57,80,0.35)] bg-[rgba(192,57,80,0.14)] px-3 py-1 text-[0.75rem] font-bold text-[#ff8a9a]"
            >
              Delete
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3 py-1 text-[0.75rem] font-bold text-[color:var(--app-text)]"
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
        <div className="grid grid-cols-2 gap-2 max-[720px]:grid-cols-1">
          <input
            type="date"
            value={draft.date}
            onChange={(event) => setDraft((prev) => ({ ...prev, date: event.target.value }))}
            className="rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-2 py-1 text-[0.78rem] text-[color:var(--app-text)] shadow-[0_2px_6px_rgba(34,55,111,0.05)]"
          />
          <input
            placeholder="Description"
            value={draft.description}
            onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
            className="rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-2 py-1 text-[0.78rem] text-[color:var(--app-text)] placeholder:text-[color:var(--app-muted-2)] shadow-[0_2px_6px_rgba(34,55,111,0.05)]"
          />
          <input
            placeholder="Category"
            value={draft.category}
            onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}
            className="rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-2 py-1 text-[0.78rem] text-[color:var(--app-text)] placeholder:text-[color:var(--app-muted-2)] shadow-[0_2px_6px_rgba(34,55,111,0.05)]"
          />
          <input
            type="number"
            placeholder="Amount"
            value={draft.amount}
            onChange={(event) => setDraft((prev) => ({ ...prev, amount: event.target.value }))}
            className="rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-2 py-1 text-[0.78rem] text-[color:var(--app-text)] placeholder:text-[color:var(--app-muted-2)] shadow-[0_2px_6px_rgba(34,55,111,0.05)]"
          />
          <select
            value={draft.type}
            onChange={(event) => setDraft((prev) => ({ ...prev, type: event.target.value }))}
            className="rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-2 py-1 text-[0.78rem] text-[color:var(--app-text)] shadow-[0_2px_6px_rgba(34,55,111,0.05)]"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="transfer">Transfer</option>
          </select>
          <select
            value={draft.status}
            onChange={(event) => setDraft((prev) => ({ ...prev, status: event.target.value }))}
            className="rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-2 py-1 text-[0.78rem] text-[color:var(--app-text)] shadow-[0_2px_6px_rgba(34,55,111,0.05)]"
          >
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
    </Modal>
  )
}
