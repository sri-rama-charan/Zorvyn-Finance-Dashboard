export function CreditScorePanel({ account }) {
  return (
    <article className="rounded-2xl border border-[#e6ebf7] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="m-0 text-base text-[#1f2651]">Card Credit Score</h2>
        <button type="button" className="min-h-[2.4rem] rounded-xl border border-[#e3e8f7] bg-[#f4f6fc] px-3 text-[#4f5f97]">Current card</button>
      </div>

      <div
        className="mx-auto mt-1 mb-3 grid h-[146px] w-[146px] place-items-center rounded-full bg-[conic-gradient(#44b06e_0deg_260deg,#ecf1fb_260deg_360deg)]"
        role="img"
        aria-label={`Credit score ${account.creditScore} out of 850`}
      >
        <div className="grid h-28 w-28 place-items-center rounded-full border border-[#e2e9fa] bg-white text-center">
          <p className="m-0 text-[1.7rem] leading-none font-extrabold text-[#1f356f]">{account.creditScore}</p>
          <p className="mt-1 text-[0.76rem] text-[#4e925e]">{account.creditLabel}</p>
        </div>
      </div>

      <ul className="m-0 grid gap-1.5 pl-4 text-[0.81rem] text-[#42568f]">
        <li>Payment history: strong</li>
        <li>Utilization ratio: 31%</li>
        <li>Recommendation: keep below 30%</li>
      </ul>
    </article>
  )
}
