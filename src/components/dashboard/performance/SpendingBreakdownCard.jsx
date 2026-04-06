import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { SpendingCategoryBreakdownList } from '../../shared/SpendingCategoryBreakdownList'
import { PanelCard } from '../../shared/PanelCard'

export function SpendingBreakdownCard({
  onOpenInsightsRoute,
  account,
  formatCurrency,
  breakdownGradient,
  topCategories,
}) {
  return (
    <PanelCard
      interactive
      role="button"
      tabIndex={0}
      onClick={onOpenInsightsRoute}
      onKeyDown={(event) => event.key === 'Enter' && onOpenInsightsRoute()}
    >
      <SectionPanelHeader title="Spending Breakdown" actionLabel="Open insights" />

      <div className="grid grid-cols-1 justify-items-center gap-3 max-[720px]:grid-cols-1">
        <div className="grid h-[150px] w-[150px] place-items-center rounded-full" style={{ background: `conic-gradient(${breakdownGradient})` }}>
          <div className="grid h-[95px] w-[95px] place-items-center rounded-full border border-[#e1e8f7] bg-white text-center">
            <p className="m-0 text-[1.05rem] font-extrabold text-[#18315f]">{formatCurrency(account.expenses, account.currency)}</p>
            <p className="mt-0.5 text-[0.72rem] text-[#6574aa]">Total expense</p>
          </div>
        </div>

        <SpendingCategoryBreakdownList
          topCategories={topCategories}
          formatCurrency={formatCurrency}
          currency={account.currency}
        />
      </div>
    </PanelCard>
  )
}
