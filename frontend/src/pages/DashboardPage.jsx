import Navbar from '../components/layout/Navbar'
import { useDashboard } from '../hooks/useDashboard'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
function DashboardPage () {
  const { summary, loading, error } = useDashboard()
  if (loading)
    return (
      <main className='brutal-shell'>
        <p className='empty'>Crunching your numbers...</p>
      </main>
    )
  if (error)
    return (
      <main className='brutal-shell'>
        <p className='message-error'>{error}</p>
      </main>
    )
  const balanceClass = summary.balance >= 0 ? 'mint' : 'pink'
  return (
    <main className='brutal-shell'>
      <Navbar />
      <header className='page-head'>
        <div>
          <p className='kicker'>The big picture</p>
          <h1>
            Money
            <br />
            matters.
          </h1>
        </div>
        <p className='brutal-card'>No fluff. Just your cash flow.</p>
      </header>
      <section className='summary-grid'>
        <article className={`brutal-card stat-card ${balanceClass}`}>
          <span className='stat-label'>Total balance</span>
          <strong className='stat-number'>
            {summary.balance < 0 ? '−' : ''}Rs. {Math.abs(summary.balance)}
          </strong>
        </article>
        <article className='brutal-card stat-card mint'>
          <span className='stat-label'>Money in</span>
          <strong className='stat-number'>Rs. {summary.totalIncome}</strong>
        </article>
        <article className='brutal-card stat-card pink'>
          <span className='stat-label'>Money out</span>
          <strong className='stat-number'>Rs. {summary.totalExpense}</strong>
        </article>
      </section>
      <section className='dashboard-grid'>
        <article className='brutal-card'>
          <h2>Income vs. expense</h2>
          <div className='chart-wrap'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={[
                  { name: 'IN', value: summary.totalIncome },
                  { name: 'OUT', value: summary.totalExpense }
                ]}
              >
                <XAxis dataKey='name' stroke='#161616' tickLine={false} />
                <YAxis stroke='#161616' tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#fff25c' }}
                  contentStyle={{
                    border: '3px solid #161616',
                    borderRadius: 0
                  }}
                />
                <Bar dataKey='value' stroke='#161616' strokeWidth={3}>
                  <Cell fill='#68e0b3' />
                  <Cell fill='#ff6b6b' />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className='brutal-card'>
          <h2>Where it went</h2>
          <div className='category-list'>
            {summary.categoryBreakdown.length ? (
              summary.categoryBreakdown.map((item, i) => (
                <div className='category-row' key={i}>
                  <div>
                    <strong>{item.categoryName}</strong>
                    <div className='muted'>{item.type}</div>
                  </div>
                  <span className={`amount ${item.type}`}>
                    Rs. {item.total}
                  </span>
                </div>
              ))
            ) : (
              <p className='empty'>Add a transaction to see the breakdown.</p>
            )}
          </div>
        </article>
      </section>
    </main>
  )
}
export default DashboardPage
