import { PanelCard } from '../../shared/PanelCard'
import { SectionPanelHeader } from '../../shared/SectionPanelHeader'

export function CreditScorePanel({ account }) {
  return (
    <PanelCard>
      <SectionPanelHeader title="Card Credit Score" actionLabel="Current card" />

      <div
        className="mx-auto mt-1 mb-3 grid h-[146px] w-[146px] place-items-center rounded-full bg-[conic-gradient(#224f8f_0deg,#97e97a_260deg,#ecf1fb_260deg_360deg)]"
        role="img"
        aria-label={`Credit score ${account.creditScore} out of 850`}
      >
        <div className="grid h-28 w-28 place-items-center rounded-full border border-[#e2e9fa] bg-white text-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <p className="m-0 text-[1.7rem] leading-none font-extrabold tracking-tight text-[#1f356f]">{account.creditScore}</p>
          <p className="mt-1 text-[0.76rem] font-medium text-[#4a8a5b]">{account.creditLabel}</p>
        </div>
      </div>

      <ul className="m-0 grid gap-1.5 pl-4 pb-2 text-[0.8rem] text-[#4b5f95]">
        <li>Payment history: strong</li>
        <li>Utilization ratio: 31%</li>
        <li>Recommendation: keep below 30%</li>
      </ul>
    </PanelCard>
  )
}
