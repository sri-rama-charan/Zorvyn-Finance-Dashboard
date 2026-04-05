import { useMemo, useState } from 'react'
import './App.css'

const accountData = {
  'Personal USD': {
    label: 'Personal USD',
    currency: 'USD',
    balance: 31180,
    balanceDelta: '+4.3% from last month',
    cardNumber: '**** 3728',
    income: 12840,
    incomeMeta: 'Salary + freelance',
    incomeDelta: '+5.1%',
    expenses: 4324,
    expensesMeta: 'Needs and subscriptions',
    expensesDelta: '-1.2%',
    savings: 8516,
    savingsMeta: '26.8% savings rate',
    savingsDelta: '+11.5%',
    dailyLimit: { used: 140, total: 200 },
    monthlyLimit: { used: 3640, total: 4000 },
    creditScore: 762,
    creditLabel: 'Very Good',
    spending: [
      { category: 'Food', amount: 1540 },
      { category: 'Travel', amount: 920 },
      { category: 'Shopping', amount: 760 },
      { category: 'Bills', amount: 560 },
      { category: 'Other', amount: 544 },
    ],
    monthlySeries: [
      { month: 'Jan', income: 3200, expenses: 1500 },
      { month: 'Feb', income: 3400, expenses: 1700 },
      { month: 'Mar', income: 3600, expenses: 1600 },
      { month: 'Apr', income: 3800, expenses: 2100 },
      { month: 'May', income: 4000, expenses: 2000 },
      { month: 'Jun', income: 3900, expenses: 2300 },
      { month: 'Jul', income: 4200, expenses: 1900 },
      { month: 'Aug', income: 4400, expenses: 2400 },
      { month: 'Sep', income: 4600, expenses: 1800 },
    ],
    cards: [
      { name: 'Visa Classic', amount: 22678, state: 'Active' },
      { name: 'Mastercard Gold', amount: 8940, state: 'Active' },
      { name: 'Virtual Card', amount: 1280, state: 'Inactive' },
    ],
    plans: [
      { name: 'Emergency Fund', saved: 5000, target: 10000 },
      { name: 'Vacation Fund', saved: 3000, target: 5000 },
      { name: 'Home Down Payment', saved: 7250, target: 20000 },
    ],
    transactions: [
      { id: 1, date: '2026-04-03', description: 'Salary payout', category: 'Income', amount: 4200, type: 'income', status: 'Completed' },
      { id: 2, date: '2026-04-03', description: 'Freelance invoice', category: 'Income', amount: 860, type: 'income', status: 'Completed' },
      { id: 3, date: '2026-04-04', description: 'Grocery market', category: 'Food', amount: -92.8, type: 'expense', status: 'Completed' },
      { id: 4, date: '2026-04-04', description: 'Uber ride', category: 'Transport', amount: -18.4, type: 'expense', status: 'Completed' },
      { id: 5, date: '2026-04-05', description: 'Streaming subscription', category: 'Bills', amount: -14.99, type: 'expense', status: 'Pending' },
      { id: 6, date: '2026-04-05', description: 'Coffee shop', category: 'Food', amount: -8.6, type: 'expense', status: 'Completed' },
      { id: 7, date: '2026-04-06', description: 'Transfer to savings', category: 'Savings', amount: -500, type: 'transfer', status: 'Completed' },
      { id: 8, date: '2026-04-06', description: 'Online purchase', category: 'Shopping', amount: -124.5, type: 'expense', status: 'Pending' },
    ],
  },
  'Savings EUR': {
    label: 'Savings EUR',
    currency: 'EUR',
    balance: 18940,
    balanceDelta: '+1.8% from last month',
    cardNumber: '**** 8421',
    income: 5400,
    incomeMeta: 'Interest + transfers',
    incomeDelta: '+2.4%',
    expenses: 1840,
    expensesMeta: 'Low spending account',
    expensesDelta: '-0.8%',
    savings: 13210,
    savingsMeta: '69.7% savings rate',
    savingsDelta: '+3.4%',
    dailyLimit: { used: 80, total: 150 },
    monthlyLimit: { used: 1260, total: 2500 },
    creditScore: 791,
    creditLabel: 'Excellent',
    spending: [
      { category: 'Food', amount: 420 },
      { category: 'Bills', amount: 300 },
      { category: 'Transport', amount: 260 },
      { category: 'Travel', amount: 520 },
      { category: 'Other', amount: 340 },
    ],
    monthlySeries: [
      { month: 'Jan', income: 1200, expenses: 700 },
      { month: 'Feb', income: 900, expenses: 800 },
      { month: 'Mar', income: 1600, expenses: 500 },
      { month: 'Apr', income: 1300, expenses: 650 },
      { month: 'May', income: 1700, expenses: 900 },
      { month: 'Jun', income: 1500, expenses: 730 },
      { month: 'Jul', income: 1400, expenses: 620 },
      { month: 'Aug', income: 1650, expenses: 800 },
      { month: 'Sep', income: 1800, expenses: 640 },
    ],
    cards: [
      { name: 'Savings Debit', amount: 11120, state: 'Active' },
      { name: 'EUR Wallet', amount: 3820, state: 'Active' },
      { name: 'Reserve', amount: 4000, state: 'Inactive' },
    ],
    plans: [
      { name: 'Emergency Fund', saved: 3200, target: 5000 },
      { name: 'Home Repair', saved: 2100, target: 6000 },
      { name: 'Education', saved: 2400, target: 8000 },
    ],
    transactions: [
      { id: 1, date: '2026-04-02', description: 'Monthly transfer in', category: 'Income', amount: 1200, type: 'income', status: 'Completed' },
      { id: 2, date: '2026-04-03', description: 'Book purchase', category: 'Education', amount: -48.3, type: 'expense', status: 'Completed' },
      { id: 3, date: '2026-04-04', description: 'Train ticket', category: 'Transport', amount: -27.2, type: 'expense', status: 'Completed' },
      { id: 4, date: '2026-04-04', description: 'Interest payout', category: 'Income', amount: 32.5, type: 'income', status: 'Completed' },
      { id: 5, date: '2026-04-05', description: 'Sinking fund transfer', category: 'Savings', amount: -300, type: 'transfer', status: 'Completed' },
      { id: 6, date: '2026-04-06', description: 'Cafe breakfast', category: 'Food', amount: -12.4, type: 'expense', status: 'Pending' },
    ],
  },
  'Travel GBP': {
    label: 'Travel GBP',
    currency: 'GBP',
    balance: 6100,
    balanceDelta: '+7.2% from last month',
    cardNumber: '**** 5534',
    income: 2300,
    incomeMeta: 'Trip reimbursements',
    incomeDelta: '+9.2%',
    expenses: 1750,
    expensesMeta: 'Travel and food',
    expensesDelta: '+4.1%',
    savings: 2350,
    savingsMeta: '38.5% savings rate',
    savingsDelta: '+6.8%',
    dailyLimit: { used: 110, total: 220 },
    monthlyLimit: { used: 1640, total: 2800 },
    creditScore: 735,
    creditLabel: 'Good',
    spending: [
      { category: 'Travel', amount: 780 },
      { category: 'Food', amount: 490 },
      { category: 'Shopping', amount: 220 },
      { category: 'Bills', amount: 140 },
      { category: 'Other', amount: 120 },
    ],
    monthlySeries: [
      { month: 'Jan', income: 700, expenses: 500 },
      { month: 'Feb', income: 900, expenses: 650 },
      { month: 'Mar', income: 1200, expenses: 700 },
      { month: 'Apr', income: 1300, expenses: 900 },
      { month: 'May', income: 1700, expenses: 950 },
      { month: 'Jun', income: 1500, expenses: 800 },
      { month: 'Jul', income: 1600, expenses: 1000 },
      { month: 'Aug', income: 1800, expenses: 1100 },
      { month: 'Sep', income: 2000, expenses: 950 },
    ],
    cards: [
      { name: 'Travel Visa', amount: 3200, state: 'Active' },
      { name: 'Cashback Card', amount: 1500, state: 'Active' },
      { name: 'Backup Wallet', amount: 1400, state: 'Inactive' },
    ],
    plans: [
      { name: 'Next Trip Fund', saved: 1500, target: 3000 },
      { name: 'Weekend Budget', saved: 650, target: 1000 },
      { name: 'Airport Reserve', saved: 200, target: 800 },
    ],
    transactions: [
      { id: 1, date: '2026-04-01', description: 'Hotel booking', category: 'Travel', amount: -320, type: 'expense', status: 'Completed' },
      { id: 2, date: '2026-04-02', description: 'Reimbursement', category: 'Income', amount: 600, type: 'income', status: 'Completed' },
      { id: 3, date: '2026-04-03', description: 'Meal in airport', category: 'Food', amount: -24.4, type: 'expense', status: 'Completed' },
      { id: 4, date: '2026-04-04', description: 'Taxi', category: 'Travel', amount: -26.8, type: 'expense', status: 'Pending' },
      { id: 5, date: '2026-04-05', description: 'Shopping', category: 'Shopping', amount: -54.5, type: 'expense', status: 'Completed' },
    ],
  },
}

const formatCurrency = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: Math.abs(amount) >= 1000 ? 0 : 2,
  }).format(amount)

const formatSignedPercent = (value) => (value.startsWith('-') ? value : value)

function App() {
  const [role, setRole] = useState('Viewer')
  const [activeAccount, setActiveAccount] = useState('Personal USD')
  const [search, setSearch] = useState('')
  const [transactionType, setTransactionType] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [view, setView] = useState('dashboard')
  const [insightRange, setInsightRange] = useState('monthly')

  const account = accountData[activeAccount]

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const rows = account.transactions.filter((transaction) => {
      const matchesSearch =
        !normalizedSearch ||
        [transaction.description, transaction.category, transaction.type, transaction.status]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesType = transactionType === 'all' || transaction.type === transactionType

      return matchesSearch && matchesType
    })

    rows.sort((first, second) => {
      if (sortBy === 'amount-desc') {
        return Math.abs(second.amount) - Math.abs(first.amount)
      }

      if (sortBy === 'amount-asc') {
        return Math.abs(first.amount) - Math.abs(second.amount)
      }

      const firstDate = new Date(first.date).getTime()
      const secondDate = new Date(second.date).getTime()
      return sortBy === 'date-asc' ? firstDate - secondDate : secondDate - firstDate
    })

    return rows
  }, [account.transactions, search, transactionType, sortBy])

  const topCategories = useMemo(() => {
    const total = account.spending.reduce((sum, item) => sum + item.amount, 0)
    return account.spending.map((item) => ({
      ...item,
      percent: total ? Math.round((item.amount / total) * 100) : 0,
    }))
  }, [account.spending])

  const breakdownGradient = useMemo(() => {
    const colors = ['#274c77', '#5f8dee', '#9bd87d', '#ffb36a', '#7a7de8']
    let start = 0

    return topCategories
      .map((item, index) => {
        const end = start + item.percent
        const segment = `${colors[index % colors.length]} ${start}% ${end}%`
        start = end
        return segment
      })
      .join(', ')
  }, [topCategories])

  const incomePoints = useMemo(
    () =>
      account.monthlySeries
        .map((point, index) => `${20 + index * 70},${185 - (point.income / 5000) * 120}`)
        .join(' '),
    [account.monthlySeries],
  )

  const expensePoints = useMemo(
    () =>
      account.monthlySeries
        .map((point, index) => `${20 + index * 70},${195 - (point.expenses / 3000) * 110}`)
        .join(' '),
    [account.monthlySeries],
  )

  const highestCategory = topCategories.reduce(
    (current, item) => (item.amount > current.amount ? item : current),
    topCategories[0],
  )

  const monthlyExpenseTotal = account.monthlySeries.reduce((sum, point) => sum + point.expenses, 0)
  const monthlyIncomeTotal = account.monthlySeries.reduce((sum, point) => sum + point.income, 0)
  const savingsRate = Math.round((account.savings / account.income) * 100)

  const recentActivity = useMemo(
    () =>
      account.transactions.slice(0, 5).map((transaction) => ({
        id: transaction.id,
        title: transaction.description,
        meta: `${transaction.date} · ${transaction.category}`,
        type: transaction.type,
        amount: transaction.amount,
      })),
    [account.transactions],
  )

  const weeklySeries = useMemo(() => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const totals = Object.fromEntries(weekdays.map((day) => [day, 0]))

    account.transactions.forEach((transaction, index) => {
      const day = weekdays[index % weekdays.length]
      totals[day] += Math.abs(transaction.amount)
    })

    return weekdays.map((day) => ({ label: day, value: totals[day] }))
  }, [account.transactions])

  const monthlyExpenseBars = account.monthlySeries.map((item) => ({
    label: item.month,
    value: item.expenses,
  }))

  const activeRangeSeries = insightRange === 'weekly' ? weeklySeries : monthlyExpenseBars
  const activeRangeMax = Math.max(...activeRangeSeries.map((item) => item.value), 1)

  if (view === 'insights') {
    return (
      <div className="dashboard-shell insights-shell">
        <aside className="sidebar">
          <div className="brand-mark" aria-hidden="true">
            ▲
          </div>
          <nav className="sidebar-nav" aria-label="Primary navigation">
            <button className="nav-item" type="button" onClick={() => setView('dashboard')}>
              Dashboard
            </button>
            <button className="nav-item active" type="button">
              Insights
            </button>
            <button className="nav-item" type="button">
              Transactions
            </button>
            <button className="nav-item" type="button">
              Reports
            </button>
            <button className="nav-item" type="button">
              Settings
            </button>
          </nav>
        </aside>

        <main className="dashboard-main insights-main">
          <header className="topbar insights-topbar">
            <div>
              <p className="eyebrow">Detailed Insights</p>
              <h1>Spending Breakdown</h1>
            </div>

            <div className="topbar-actions">
              <button type="button" className="ghost-btn" onClick={() => setView('dashboard')}>
                Back to dashboard
              </button>
              <div className="range-switcher" role="tablist" aria-label="Insight range">
                <button
                  type="button"
                  className={insightRange === 'weekly' ? 'range-tab active' : 'range-tab'}
                  onClick={() => setInsightRange('weekly')}
                >
                  Weekly
                </button>
                <button
                  type="button"
                  className={insightRange === 'monthly' ? 'range-tab active' : 'range-tab'}
                  onClick={() => setInsightRange('monthly')}
                >
                  Monthly
                </button>
              </div>
            </div>
          </header>

          <section className="summary-grid insights-summary" aria-label="Insight highlights">
            <article className="surface metric-card insight-highlight">
              <p className="label">{insightRange === 'weekly' ? 'Weekly spend' : 'Monthly spend'}</p>
              <p className="value">
                {formatCurrency(
                  insightRange === 'weekly' ? activeRangeSeries.reduce((sum, item) => sum + item.value, 0) : monthlyExpenseTotal,
                  account.currency,
                )}
              </p>
              <p className="meta">Selected period spending</p>
            </article>

            <article className="surface metric-card insight-highlight">
              <p className="label">Average per period</p>
              <p className="value">
                {formatCurrency(
                  (insightRange === 'weekly'
                    ? activeRangeSeries.reduce((sum, item) => sum + item.value, 0) / activeRangeSeries.length
                    : monthlyExpenseTotal / account.monthlySeries.length),
                  account.currency,
                )}
              </p>
              <p className="meta">Spread across the selected range</p>
            </article>

            <article className="surface metric-card insight-highlight">
              <p className="label">Top category</p>
              <p className="value">{highestCategory.category}</p>
              <p className="meta">{formatCurrency(highestCategory.amount, account.currency)}</p>
            </article>

            <article className="surface metric-card insight-highlight">
              <p className="label">Savings rate</p>
              <p className="value">{savingsRate}%</p>
              <p className="meta">Healthy for this account</p>
            </article>
          </section>

          <section className="insights-grid">
            <article className="surface panel insight-trend-panel">
              <div className="panel-header">
                <h2>{insightRange === 'weekly' ? 'Weekly Trend' : 'Monthly Trend'}</h2>
                <button type="button" className="ghost-btn">
                  Period details
                </button>
              </div>

              <div className="insight-bars">
                {activeRangeSeries.map((item) => (
                  <div className="insight-bar-item" key={item.label}>
                    <div className="insight-bar-track">
                      <div
                        className="insight-bar-fill"
                        style={{ height: `${(item.value / activeRangeMax) * 100}%` }}
                      ></div>
                    </div>
                    <p className="insight-bar-label">{item.label}</p>
                    <p className="insight-bar-value">{formatCurrency(item.value, account.currency)}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface panel insight-breakdown-panel">
              <div className="panel-header">
                <h2>Category Breakdown</h2>
                <button type="button" className="ghost-btn">
                  Compare months
                </button>
              </div>

              <div className="breakdown-wrap breakdown-stack">
                <div className="breakdown-ring" style={{ background: `conic-gradient(${breakdownGradient})` }}>
                  <div className="breakdown-ring-inner">
                    <p className="breakdown-total">{formatCurrency(account.expenses, account.currency)}</p>
                    <p className="breakdown-caption">Total expense</p>
                  </div>
                </div>

                <div className="breakdown-list vertical-list">
                  {topCategories.map((item) => (
                    <div className="breakdown-item vertical-item" key={item.category}>
                      <div className="breakdown-item-row">
                        <span className="category-chip">{item.percent}%</span>
                        <span>{item.category}</span>
                        <strong>{formatCurrency(item.amount, account.currency)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="content-grid insights-bottom-grid">
            <article className="surface panel">
              <div className="panel-header">
                <h2>What changed</h2>
                <button type="button" className="ghost-btn">
                  {insightRange === 'weekly' ? 'This week' : 'This month'}
                </button>
              </div>
              <ul className="insight-list">
                <li>
                  Highest spending category: {highestCategory.category} ({formatCurrency(highestCategory.amount, account.currency)})
                </li>
                <li>
                  Monthly spending sits at {formatCurrency(monthlyExpenseTotal, account.currency)} against {formatCurrency(monthlyIncomeTotal, account.currency)} income
                </li>
                <li>
                  Savings rate is {savingsRate}%, which is healthy for this account
                </li>
              </ul>
            </article>

            <article className="surface panel">
              <div className="panel-header">
                <h2>Recent Activity</h2>
                <button type="button" className="ghost-btn">
                  Live feed
                </button>
              </div>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div className="activity-item" key={activity.id}>
                    <div>
                      <p className="activity-title">{activity.title}</p>
                      <p className="activity-meta">{activity.meta}</p>
                    </div>
                    <span className={`transaction-pill ${activity.type}`}>{activity.type}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-mark" aria-hidden="true">
          ▲
        </div>
        <nav className="sidebar-nav" aria-label="Primary navigation">
          <button className="nav-item active" type="button">
            Dashboard
          </button>
          <button className="nav-item" type="button">
            Transactions
          </button>
          <button className="nav-item" type="button">
            Reports
          </button>
          <button className="nav-item" type="button">
            Insights
          </button>
          <button className="nav-item" type="button">
            Settings
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Finance Dashboard</p>
            <h1>Welcome back</h1>
          </div>

          <div className="topbar-actions">
            <input
              className="search"
              type="search"
              placeholder="Search transactions"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <label className="role-select" htmlFor="role-switch">
              <span>Role</span>
              <select
                id="role-switch"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option>Viewer</option>
                <option>Admin</option>
              </select>
            </label>

            <button className="primary-btn" type="button" disabled={role === 'Viewer'}>
              + Add
            </button>
          </div>
        </header>

        <section className="overview-grid" aria-label="Financial overview">
          <div className="summary-grid" aria-label="Financial summary cards">
            <article className="surface metric-card balance-card">
              <p className="label">Total Balance</p>
              <p className="value">{formatCurrency(account.balance, account.currency)}</p>
              <p className="meta">{account.balanceDelta}</p>
              <p className="card-number">{account.cardNumber}</p>
            </article>

            <div className="kpi-strip" aria-label="Income expenses and savings">
              <article className="surface metric-card kpi-card income-card">
                <div className="kpi-head">
                  <span className="kpi-icon" aria-hidden="true">↗</span>
                  <p className="label">Income</p>
                  <span className="kpi-trend up">{formatSignedPercent(account.incomeDelta)}</span>
                </div>
                <p className="value">{formatCurrency(account.income, account.currency)}</p>
                <p className="meta">{account.incomeMeta}</p>
                <div className="mini-spark" aria-hidden="true">
                  <span style={{ height: '26%' }}></span>
                  <span style={{ height: '42%' }}></span>
                  <span style={{ height: '35%' }}></span>
                  <span style={{ height: '58%' }}></span>
                  <span style={{ height: '72%' }}></span>
                  <span style={{ height: '64%' }}></span>
                </div>
              </article>

              <article className="surface metric-card kpi-card expense-card">
                <div className="kpi-head">
                  <span className="kpi-icon" aria-hidden="true">↘</span>
                  <p className="label">Expenses</p>
                  <span className="kpi-trend down">{formatSignedPercent(account.expensesDelta)}</span>
                </div>
                <p className="value">{formatCurrency(account.expenses, account.currency)}</p>
                <p className="meta">{account.expensesMeta}</p>
                <div className="mini-spark" aria-hidden="true">
                  <span style={{ height: '58%' }}></span>
                  <span style={{ height: '54%' }}></span>
                  <span style={{ height: '62%' }}></span>
                  <span style={{ height: '46%' }}></span>
                  <span style={{ height: '42%' }}></span>
                  <span style={{ height: '37%' }}></span>
                </div>
              </article>

              <article className="surface metric-card kpi-card savings-card">
                <div className="kpi-head">
                  <span className="kpi-icon" aria-hidden="true">◌</span>
                  <p className="label">Savings</p>
                  <span className="kpi-trend up">{formatSignedPercent(account.savingsDelta)}</span>
                </div>
                <p className="value">{formatCurrency(account.savings, account.currency)}</p>
                <p className="meta">{account.savingsMeta}</p>
                <div className="mini-spark" aria-hidden="true">
                  <span style={{ height: '22%' }}></span>
                  <span style={{ height: '30%' }}></span>
                  <span style={{ height: '44%' }}></span>
                  <span style={{ height: '55%' }}></span>
                  <span style={{ height: '66%' }}></span>
                  <span style={{ height: '74%' }}></span>
                </div>
              </article>
            </div>
          </div>

          <article className="surface panel limit-panel" aria-label="Spending limits">
            <div className="panel-header">
              <h2>Spend Limits</h2>
              <button type="button" className="ghost-btn">This month</button>
            </div>

            <div className="limit-grid">
              <div className="limit-item">
                <div className="limit-row">
                  <p className="limit-label">Daily limit</p>
                  <p className="limit-percentage">
                    {Math.round((account.dailyLimit.used / account.dailyLimit.total) * 100)}%
                  </p>
                </div>
                <div className="progress-track" role="presentation">
                  <div
                    className="progress-fill daily"
                    style={{ width: `${(account.dailyLimit.used / account.dailyLimit.total) * 100}%` }}
                  ></div>
                </div>
                <p className="limit-meta">
                  {formatCurrency(account.dailyLimit.used, account.currency)} of {formatCurrency(account.dailyLimit.total, account.currency)} spent
                </p>
              </div>

              <div className="limit-item">
                <div className="limit-row">
                  <p className="limit-label">Monthly limit</p>
                  <p className="limit-percentage">
                    {Math.round((account.monthlyLimit.used / account.monthlyLimit.total) * 100)}%
                  </p>
                </div>
                <div className="progress-track" role="presentation">
                  <div
                    className="progress-fill monthly"
                    style={{ width: `${(account.monthlyLimit.used / account.monthlyLimit.total) * 100}%` }}
                  ></div>
                </div>
                <p className="limit-meta">
                  {formatCurrency(account.monthlyLimit.used, account.currency)} of {formatCurrency(account.monthlyLimit.total, account.currency)} spent
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="content-grid">
          <article className="surface panel chart-panel">
            <div className="panel-header">
              <h2>Income vs Expenses</h2>
              <button type="button" className="ghost-btn">Monthly</button>
            </div>

            <div className="chart-summary">
              <div>
                <p className="chart-summary-label">Net trend</p>
                <p className="chart-summary-value">{formatCurrency(monthlyIncomeTotal - monthlyExpenseTotal, account.currency)}</p>
              </div>
              <div>
                <p className="chart-summary-label">Savings rate</p>
                <p className="chart-summary-value">{savingsRate}%</p>
              </div>
            </div>

            <div className="chart-legend" aria-hidden="true">
              <span><i className="dot income"></i>Income</span>
              <span><i className="dot expense"></i>Expenses</span>
            </div>

            <svg
              className="line-chart"
              viewBox="0 0 640 220"
              role="img"
              aria-label="Income and expenses trend over months"
            >
              <line x1="20" y1="60" x2="620" y2="60" className="chart-grid" />
              <line x1="20" y1="110" x2="620" y2="110" className="chart-grid" />
              <line x1="20" y1="160" x2="620" y2="160" className="chart-grid" />
              <polyline
                className="income-line"
                points={incomePoints}
              />
              <polyline
                className="expense-line"
                points={expensePoints}
              />
            </svg>

            <div className="chart-axis" aria-hidden="true">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </article>

          <article
            className="surface panel chart-panel breakdown-card"
            role="button"
            tabIndex={0}
            onClick={() => setView('insights')}
            onKeyDown={(event) => event.key === 'Enter' && setView('insights')}
          >
            <div className="panel-header">
              <h2>Spending Breakdown</h2>
              <button type="button" className="ghost-btn">Open insights</button>
            </div>

            <div className="breakdown-wrap breakdown-stack">
              <div className="breakdown-ring" style={{ background: `conic-gradient(${breakdownGradient})` }}>
                <div className="breakdown-ring-inner">
                  <p className="breakdown-total">{formatCurrency(account.expenses, account.currency)}</p>
                  <p className="breakdown-caption">Total expense</p>
                </div>
              </div>

              <div className="breakdown-list vertical-list">
                {topCategories.map((item) => (
                  <div className="breakdown-item vertical-item" key={item.category}>
                    <div className="breakdown-item-row">
                      <span className="category-chip">{item.percent}%</span>
                      <span>{item.category}</span>
                      <strong>{formatCurrency(item.amount, account.currency)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="utility-grid" aria-label="Account and goals overview">
          <article className="surface panel account-panel">
            <div className="panel-header">
              <h2>Accounts & Cards</h2>
              <button type="button" className="ghost-btn" disabled={role === 'Viewer'}>
                Manage
              </button>
            </div>

            <label className="account-switcher" htmlFor="account-switch">
              <span>Active account</span>
              <select
                id="account-switch"
                value={activeAccount}
                onChange={(event) => setActiveAccount(event.target.value)}
              >
                <option>Personal USD</option>
                <option>Savings EUR</option>
                <option>Travel GBP</option>
              </select>
            </label>

            <div className="account-cards" aria-label="Connected cards">
              {account.cards.map((card, index) => (
                <article className={`mini-card ${index === 0 ? 'is-active' : ''}`} key={card.name}>
                  <p className="mini-card-title">{card.name}</p>
                  <p className="mini-card-amount">{formatCurrency(card.amount, account.currency)}</p>
                  <p className={`mini-card-state ${card.state === 'Inactive' ? 'inactive' : ''}`}>
                    {card.state}
                  </p>
                </article>
              ))}
            </div>
          </article>

          <article className="surface panel plans-panel">
            <div className="panel-header">
              <h2>Saving Plans</h2>
              <button type="button" className="ghost-btn" disabled={role === 'Viewer'}>
                + Add plan
              </button>
            </div>

            <p className="plans-total">
              Total savings target: {formatCurrency(account.plans.reduce((sum, item) => sum + item.target, 0), account.currency)}
            </p>

            {account.plans.map((plan) => {
              const percent = Math.round((plan.saved / plan.target) * 100)

              return (
                <div className="plan-item" key={plan.name}>
                  <div className="limit-row">
                    <p className="limit-label">{plan.name}</p>
                    <p className="limit-percentage">{percent}%</p>
                  </div>
                  <div className="progress-track" role="presentation">
                    <div className="progress-fill plan" style={{ width: `${percent}%` }}></div>
                  </div>
                  <p className="limit-meta">
                    {formatCurrency(plan.saved, account.currency)} saved of {formatCurrency(plan.target, account.currency)}
                  </p>
                </div>
              )
            })}
          </article>

          <article className="surface panel credit-panel">
            <div className="panel-header">
              <h2>Card Credit Score</h2>
              <button type="button" className="ghost-btn">Current card</button>
            </div>

            <div
              className="score-ring"
              role="img"
              aria-label={`Credit score ${account.creditScore} out of 850`}
            >
              <div className="score-inner">
                <p className="score-value">{account.creditScore}</p>
                <p className="score-label">{account.creditLabel}</p>
              </div>
            </div>

            <ul className="score-notes">
              <li>Payment history: strong</li>
              <li>Utilization ratio: 31%</li>
              <li>Recommendation: keep below 30%</li>
            </ul>
          </article>
        </section>

        <section className="content-grid">
          <article className="surface panel transactions-panel">
            <div className="panel-header">
              <h2>Recent Transactions</h2>
              <button type="button" className="ghost-btn">View all</button>
            </div>
            <div className="table-controls">
              <select value={transactionType} onChange={(event) => setTransactionType(event.target.value)}>
                <option value="all">All types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="transfer">Transfer</option>
              </select>

              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="date-desc">Newest first</option>
                <option value="date-asc">Oldest first</option>
                <option value="amount-desc">Largest amount</option>
                <option value="amount-asc">Smallest amount</option>
              </select>
            </div>

            <div className="transactions-table">
              <div className="transactions-head">
                <span>Date</span>
                <span>Description</span>
                <span>Category</span>
                <span>Type</span>
                <span>Amount</span>
              </div>

              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div className="transactions-row" key={transaction.id}>
                    <span>{transaction.date}</span>
                    <span>{transaction.description}</span>
                    <span>{transaction.category}</span>
                    <span className={`transaction-pill ${transaction.type}`}>{transaction.type}</span>
                    <span className={transaction.amount < 0 ? 'negative' : 'positive'}>
                      {formatCurrency(transaction.amount, account.currency)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="table-empty">No transactions match the current filters.</div>
              )}
            </div>
          </article>

          <article className="surface panel activity-panel">
            <div className="panel-header">
              <h2>Recent Activity</h2>
              <button type="button" className="ghost-btn">Live feed</button>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div className="activity-item" key={activity.id}>
                  <div>
                    <p className="activity-title">{activity.title}</p>
                    <p className="activity-meta">{activity.meta}</p>
                  </div>
                  <span className={`transaction-pill ${activity.type}`}>{activity.type}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App
