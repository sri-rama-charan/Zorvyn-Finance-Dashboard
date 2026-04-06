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
          className="rounded-full border border-[#dfe6fb] bg-white px-2 py-1 text-[0.72rem] font-bold text-[#4f67c8]"
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
                ? 'bg-[#4f67c8] text-white'
                : 'border border-[#dfe6fb] bg-white text-[#4f67c8]'
            }`}
            disabled={item === '...'}
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setTransactionPage(Math.min(currentPage + 1, totalPages))}
          className="rounded-full border border-[#dfe6fb] bg-white px-2 py-1 text-[0.72rem] font-bold text-[#4f67c8]"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
