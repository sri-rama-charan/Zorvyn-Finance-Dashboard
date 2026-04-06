export function TransactionsPagination({
  totalCount,
  startIndex,
  endIndex,
  pageItems,
  currentPage,
  totalPages,
  setTransactionPage,
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[0.78rem] text-[#6b7cb1]">
      <span>
        {totalCount ? `Showing ${startIndex}-${endIndex} of ${totalCount}` : 'No results'}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setTransactionPage(Math.max(currentPage - 1, 1))}
          className="rounded-full border border-[#dfe6fb] bg-white px-2 py-1 text-[0.72rem] font-bold text-[#4f67c8] shadow-[0_4px_10px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8d3ef] hover:bg-[#f7f9ff] disabled:opacity-60 disabled:shadow-none"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pageItems.map((item, index) => (
          <button
            key={`${item}-${index}`}
            type="button"
            onClick={() => typeof item === 'number' && setTransactionPage(item)}
            className={`min-w-[2rem] rounded-full px-2 py-1 text-[0.72rem] font-bold ${
              item === currentPage
                ? 'bg-[#4f67c8] text-white shadow-[0_4px_10px_rgba(31,43,95,0.18)]'
                : 'border border-[#dfe6fb] bg-white text-[#4f67c8] shadow-[0_4px_10px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8d3ef] hover:bg-[#f7f9ff]'
            }`}
            disabled={item === '...'}
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setTransactionPage(Math.min(currentPage + 1, totalPages))}
          className="rounded-full border border-[#dfe6fb] bg-white px-2 py-1 text-[0.72rem] font-bold text-[#4f67c8] shadow-[0_4px_10px_rgba(31,43,95,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8d3ef] hover:bg-[#f7f9ff] disabled:opacity-60 disabled:shadow-none"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
