import { Button } from '@/components/ui/button'

export function SectionPanelHeader({ title, actionLabel, onAction, actionDisabled = false }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2 max-[720px]:mb-2">
      <h2 className="m-0 text-base font-semibold tracking-tight text-[color:var(--app-text)] dark:text-white">{title}</h2>
      <Button
        variant="outline"
        className="min-h-[2.4rem] rounded-xl border-[color:var(--app-border)] bg-[color:var(--app-card-2)] px-3 text-[0.78rem] font-semibold text-[color:var(--app-muted)] shadow-[0_6px_14px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--app-card)] disabled:opacity-60 disabled:shadow-none dark:text-white"
        disabled={actionDisabled}
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  )
}
