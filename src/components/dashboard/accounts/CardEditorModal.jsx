import { Modal } from '../../shared/Modal'

export function CardEditorModal({
  open,
  modalMode,
  cardDraft,
  setCardDraft,
  onClose,
  onSave,
  onDelete,
}) {
  return (
    <Modal
      open={open}
      title={modalMode === 'add' ? 'Add card' : 'Edit card'}
      onClose={onClose}
      actions={
        <>
          {modalMode === 'edit' ? (
            <button
              type="button"
              onClick={onDelete}
              className="rounded-full border border-[#f3d1d6] bg-[#fff1f3] px-3 py-1 text-[0.75rem] font-bold text-[#c03950]"
            >
              Delete
            </button>
          ) : null}
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
        <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
          Card name
          <input
            value={cardDraft.name}
            onChange={(event) => setCardDraft((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem] text-[#2b3f85]"
            placeholder="Card name"
          />
        </label>
        <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
          Amount
          <input
            type="number"
            min="0"
            value={cardDraft.amount}
            onChange={(event) => setCardDraft((prev) => ({ ...prev, amount: event.target.value }))}
            className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem] text-[#2b3f85]"
          />
        </label>
        <label className="grid gap-1 text-[0.74rem] text-[#6f7eb0]">
          State
          <select
            value={cardDraft.state}
            onChange={(event) => setCardDraft((prev) => ({ ...prev, state: event.target.value }))}
            className="rounded-lg border border-[#e1e7f6] bg-white px-2 py-1 text-[0.78rem] text-[#2b3f85]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>
    </Modal>
  )
}
