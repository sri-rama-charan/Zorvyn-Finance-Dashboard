import { Button } from '@/components/ui/button'

export function SectionPanelHeader({ title, actionLabel, onAction, actionDisabled = false }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2 max-[720px]:mb-2">
      <h2 className="m-0 text-base font-semibold tracking-tight text-[#1f2651]">{title}</h2>
      <Button
        variant="outline"
        className="min-h-[2.4rem] rounded-xl border-[#e3e8f7] bg-[#f4f6fc] px-3 text-[0.78rem] font-semibold text-[#4f5f97] shadow-[0_6px_14px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#eef2fb] disabled:opacity-60 disabled:shadow-none"
        disabled={actionDisabled}
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  )
}
