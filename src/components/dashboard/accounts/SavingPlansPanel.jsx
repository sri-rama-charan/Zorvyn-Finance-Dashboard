import { PanelCard } from '../../shared/PanelCard'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function SavingPlansPanel({ role, account, formatCurrency }) {
  return (
    <PanelCard>
      <SectionPanelHeader title="Saving Plans" actionLabel="+ Add plan" actionDisabled={role === 'Viewer'} />

      <p className="mb-3 text-[0.81rem] text-[#5f72aa]">
        Total savings target: {formatCurrency(account.plans.reduce((sum, item) => sum + item.target, 0), account.currency)}
      </p>

      {account.plans.map((plan) => {
        const percent = Math.round((plan.saved / plan.target) * 100)
        return (
          <div className="mb-2.5 grid gap-2 rounded-xl border border-[#e0e8f9] p-2.5" key={plan.name}>
            <div className="flex items-center justify-between">
              <p className="m-0 text-[0.86rem] font-semibold text-[#27357a]">{plan.name}</p>
              <p className="m-0 text-[0.84rem] font-bold text-[#4f5f97]">{percent}%</p>
            </div>
            <div className="h-2 rounded-full bg-[#ebeffa]" role="presentation">
              <div className="h-full rounded-full bg-gradient-to-r from-[#224f8f] to-[#97e97a]" style={{ width: `${percent}%` }}></div>
            </div>
            <p className="m-0 text-[0.78rem] text-[#6676ad]">
              {formatCurrency(plan.saved, account.currency)} saved of {formatCurrency(plan.target, account.currency)}
            </p>
          </div>
        )
      })}
    </PanelCard>
  )
}
