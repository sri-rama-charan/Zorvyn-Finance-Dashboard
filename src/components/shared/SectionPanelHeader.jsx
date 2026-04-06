import { Button } from '@/components/ui/button'

export function SectionPanelHeader({ title, actionLabel, onAction, actionDisabled = false }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2 max-[720px]:mb-2">
      <h2 className="m-0 text-base text-[#1f2651]">{title}</h2>
      <Button
        variant="outline"
        className="min-h-[2.4rem] rounded-xl border-[#e3e8f7] bg-[#f4f6fc] px-3 text-[#4f5f97] hover:bg-[#eef2fb]"
        disabled={actionDisabled}
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  )
}
