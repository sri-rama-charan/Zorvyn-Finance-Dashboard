import { SectionPanelHeader } from '../../shared/SectionPanelHeader'
import { SpendingCategoryBreakdownList } from '../../shared/SpendingCategoryBreakdownList'

export function SpendingBreakdownCard({
  onOpenInsightsRoute,
  account,
  formatCurrency,
  breakdownGradient,
  topCategories,
}) {
  return (
    <article
      className="cursor-pointer rounded-2xl border border-[#e6ebf7] bg-white p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(25,37,86,0.12)]"
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
    </article>
  )
}
