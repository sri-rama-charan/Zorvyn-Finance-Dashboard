export function SectionPanelHeader({ title, actionLabel, onAction }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <h2 className="m-0 text-base text-[#1f2651]">{title}</h2>
      <button
        type="button"
        className="min-h-[2.4rem] rounded-xl border border-[#e3e8f7] bg-[#f4f6fc] px-3 text-[#4f5f97] disabled:cursor-not-allowed disabled:opacity-45"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    </div>
  )
}
