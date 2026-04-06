export function Modal({ open, title, children, onClose, actions }) {
  if (!open) return null

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && onClose) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded-2xl border border-[#e3e9f7] bg-white p-4 shadow-[0_20px_50px_rgba(20,32,70,0.2)]">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="m-0 text-[1rem] font-semibold text-[#1f2651]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-full border border-[#dfe6fb] bg-white text-[#5b6fa7] shadow-[0_4px_10px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8d3ef] hover:bg-[#f7f9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fb1e6]"
            aria-label="Close dialog"
          >
            x
          </button>
        </div>
        {children}
        {actions ? <div className="mt-4 flex justify-end gap-2">{actions}</div> : null}
      </div>
    </div>
  )
}
