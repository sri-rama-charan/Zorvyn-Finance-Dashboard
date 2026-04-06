import { PanelCard } from '../../shared/PanelCard'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function CreditScorePanel({ account }) {
  return (
    <PanelCard>
      <SectionPanelHeader title="Card Credit Score" actionLabel="Current card" />

      <div
        className="mx-auto mt-1 mb-3 grid h-[146px] w-[146px] place-items-center rounded-full bg-[conic-gradient(#224f8f_0deg,#97e97a_260deg,var(--app-card-2)_260deg_360deg)]"
        role="img"
        aria-label={`Credit score ${account.creditScore} out of 850`}
      >
        <div className="grid h-28 w-28 place-items-center rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-card)] text-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <p className="m-0 text-[1.7rem] leading-none font-extrabold tracking-tight text-[color:var(--app-text)] dark:text-white">{account.creditScore}</p>
          <p className="mt-1 text-[0.76rem] font-medium text-[#4a8a5b] dark:text-white">{account.creditLabel}</p>
        </div>
      </div>

      <ul className="m-0 list-disc space-y-1.5 pl-5 pb-2 text-[0.8rem] text-[color:var(--app-text)] dark:text-white marker:text-[color:var(--app-muted-2)] dark:marker:text-white/70">
        <li>Payment history: strong</li>
        <li>Utilization ratio: 31%</li>
        <li>Recommendation: keep below 30%</li>
      </ul>
    </PanelCard>
  )
}
