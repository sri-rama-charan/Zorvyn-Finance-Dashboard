export function CategoryLegend({ categoriesList, isVisible, formatCurrency, account, onHoverCategory, onClearHover }) {
  return (
    <div className="mt-6 flex w-full flex-wrap justify-center gap-x-4 gap-y-2">
      {categoriesList.map((cat, index) => (
        <div
          key={cat.category}
          className={`flex items-center gap-1.5 transition-all duration-500 hover:opacity-80 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
          style={{ transitionDelay: `${index * 50}ms` }}
          onMouseEnter={() => onHoverCategory(cat)}
          onMouseLeave={onClearHover}
        >
          <i
            className="h-3 w-3 rounded-full shadow-sm"
            style={{ backgroundColor: cat.color }}
          ></i>
          <span className="text-[0.8rem] font-medium text-[color:var(--app-muted)]">{cat.category}</span>
          <span className="text-[0.75rem] text-[color:var(--app-muted)] dark:text-white">
            {formatCurrency((cat.percent / 100) * account.expenses, account.currency)}
          </span>
        </div>
      ))}
    </div>
  )
}
