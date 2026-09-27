import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { useTransactions } from '../hooks/useTransactions'
function TransactionsPage () {
  const {
    transactions,
    categories,
    loading,
    error,
    addTransaction,
    removeTransaction,
    addCategory,
    editTransaction
  } = useTransactions()
  const [form, setForm] = useState({
    amount: '',
    type: 'expense',
    description: '',
    date: '',
    category: ''
  })
  const [newCat, setNewCat] = useState('')
  const [showCat, setShowCat] = useState(false)
  const [filter, setFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [formError, setFormError] = useState('')
  const change = e =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      ...(e.target.name === 'type' ? { category: '' } : {})
    })
  const submit = async e => {
    e.preventDefault()
    try {
      await addTransaction(form)
      setForm({
        amount: '',
        type: 'expense',
        description: '',
        date: '',
        category: ''
      })
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not add transaction')
    }
  }
  const save = async id => {
    try {
      await editTransaction(id, editForm)
      setEditing(null)
    } catch {
      setFormError('Could not update transaction')
    }
  }
  const visible = transactions.filter(t => {
    const transactionDate = t.date?.slice(0, 10) || ''
    const matchesType = filter === 'all' || t.type === filter
    const matchesStart = !dateFrom || transactionDate >= dateFrom
    const matchesEnd = !dateTo || transactionDate <= dateTo
    return matchesType && matchesStart && matchesEnd
  })
  const downloadSummary = () => window.print()
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  const totals = transactions.reduce(
    (sum, transaction) => {
      if (transaction.type === 'income') sum.income += Number(transaction.amount)
      else sum.expense += Number(transaction.amount)
      return sum
    },
    { income: 0, expense: 0 }
  )
  const formatAmount = amount =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  if (loading)
    return (
      <main className='brutal-shell'>
        <p className='empty'>Loading your ledger...</p>
      </main>
    )
  return (
    <main className='brutal-shell'>
      <Navbar />
      <header className='page-head'>
        <div>
          <p className='kicker'>The full receipt</p>
          <h1>
            Cash
            <br />
            chaos.
          </h1>
        </div>
        <p className='brutal-card'>Track it. Own it.</p>
      </header>
      <div className='transactions-layout'>
        <section className='brutal-card'>
          <h2>Log a move</h2>
          {formError && <p className='message-error'>{formError}</p>}
          <form className='form-stack' onSubmit={submit}>
            <div className='form-grid'>
              <select
                className='brutal-input'
                name='type'
                value={form.type}
                onChange={change}
              >
                <option value='expense'>EXPENSE</option>
                <option value='income'>INCOME</option>
              </select>
              <select
                className='brutal-input'
                name='category'
                value={form.category}
                onChange={change}
                required
              >
                <option value=''>CATEGORY</option>
                {categories
                  .filter(c => c.type === form.type)
                  .map(c => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='form-grid'>
              <input
                className='brutal-input'
                type='number'
                name='amount'
                min='0.01'
                step='0.01'
                placeholder='AMOUNT'
                value={form.amount}
                onChange={change}
                required
              />
              <input
                className='brutal-input'
                type='date'
                name='date'
                value={form.date}
                onChange={change}
              />
            </div>
            <input
              className='brutal-input'
              name='description'
              placeholder='WHAT WAS IT?'
              value={form.description}
              onChange={change}
              required
            />
            <button
              className='brutal-button yellow'
              type='button'
              onClick={() => setShowCat(!showCat)}
            >
              + New category
            </button>
            {showCat && (
              <div className='inline-actions'>
                <input
                  className='brutal-input'
                  placeholder='CATEGORY NAME'
                  value={newCat}
                  onChange={e => setNewCat(e.target.value)}
                />
                <button
                  className='brutal-button mint'
                  type='button'
                  onClick={async () => {
                    if (!newCat) return
                    const cat = await addCategory({
                      name: newCat,
                      type: form.type
                    })
                    setForm({ ...form, category: cat._id })
                    setNewCat('')
                    setShowCat(false)
                  }}
                >
                  Add
                </button>
              </div>
            )}
            <button className='brutal-button mint'>Add transaction →</button>
          </form>
        </section>
        <section>
          <div className='filter-row'>
            {['all', 'income', 'expense'].map(f => (
              <button
                key={f}
                className={`brutal-button ${
                  filter === f ? 'active yellow' : 'white'
                }`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
            <button
              className='brutal-button mint'
              type='button'
              onClick={downloadSummary}
              disabled={!transactions.length}
            >
              Download PDF
            </button>
          </div>
          <div className='date-range-controls'>
            <label className='date-range-field'>
              From
              <input
                className='brutal-input'
                type='date'
                aria-label='Filter transactions from date'
                max={dateTo || undefined}
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
              />
            </label>
            <label className='date-range-field'>
              To
              <input
                className='brutal-input'
                type='date'
                aria-label='Filter transactions through date'
                min={dateFrom || undefined}
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
              />
            </label>
            <button
              className='brutal-button white'
              type='button'
              disabled={!dateFrom && !dateTo}
              onClick={() => {
                setDateFrom('')
                setDateTo('')
              }}
            >
              Clear dates
            </button>
          </div>
          <div className='transaction-list'>
            {error && <p className='message-error'>{error}</p>}
            {visible.length ? (
              visible.map(t => (
                <article className='transaction-row' key={t._id}>
                  {editing === t._id ? (
                    <div className='edit-grid'>
                      <input
                        className='brutal-input'
                        type='number'
                        min='0.01'
                        step='0.01'
                        value={editForm.amount}
                        onChange={e =>
                          setEditForm({ ...editForm, amount: e.target.value })
                        }
                      />
                      <input
                        className='brutal-input'
                        type='date'
                        value={editForm.date?.slice(0, 10) || ''}
                        onChange={e =>
                          setEditForm({ ...editForm, date: e.target.value })
                        }
                      />
                      <input
                        className='brutal-input'
                        value={editForm.description}
                        onChange={e =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value
                          })
                        }
                      />
                      <div className='inline-actions'>
                        <button
                          className='brutal-button mint'
                          onClick={() => save(t._id)}
                        >
                          Save
                        </button>
                        <button
                          className='brutal-button white'
                          onClick={() => setEditing(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='transaction-main'>
                      <div>
                        <p className='transaction-title'>{t.description}</p>
                        <p className='transaction-meta'>
                          {t.category?.name || 'Unsorted'} /{' '}
                          {t.date?.slice(0, 10)}
                        </p>
                      </div>
                      <div className='inline-actions'>
                        <span className={`amount ${t.type}`}>
                          {t.type === 'income' ? '+' : '−'} Rs. {t.amount}
                        </span>
                        <button
                          className='brutal-button white'
                          onClick={() => {
                            setEditing(t._id)
                            setEditForm({
                              amount: t.amount,
                              description: t.description,
                              date: t.date,
                              type: t.type,
                              category: t.category?._id
                            })
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className='brutal-button danger'
                          onClick={() => removeTransaction(t._id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              ))
            ) : (
              <p className='empty'>
                {transactions.length
                  ? 'No transactions match these filters.'
                  : 'Nothing here yet. Make a move.'}
              </p>
            )}
          </div>
        </section>
      </div>
      <section className='pdf-report' aria-label='Transaction summary for PDF'>
        <header className='pdf-report-header'>
          <div>
            <p className='pdf-report-kicker'>Ledger · Personal finance</p>
            <h1>Transaction summary</h1>
            <p>All transactions · Generated {new Date().toLocaleDateString()}</p>
          </div>
          <div className='pdf-report-balance'>
            <span>Net balance</span>
            <strong>{formatAmount(totals.income - totals.expense)}</strong>
          </div>
        </header>
        <div className='pdf-report-totals'>
          <div><span>Income</span><strong>{formatAmount(totals.income)}</strong></div>
          <div><span>Expenses</span><strong>{formatAmount(totals.expense)}</strong></div>
          <div><span>Transactions</span><strong>{transactions.length}</strong></div>
        </div>
        <table className='pdf-transaction-table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map(transaction => (
              <tr key={transaction._id}>
                <td>{transaction.date?.slice(0, 10) || '-'}</td>
                <td>{transaction.description || '-'}</td>
                <td>{transaction.category?.name || 'Unsorted'}</td>
                <td className={`pdf-amount ${transaction.type}`}>
                  {formatAmount(Number(transaction.amount))}
                </td>
                <td className='pdf-type'>{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer className='pdf-report-footer'>Personal transaction record · Keep this document private.</footer>
      </section>
    </main>
  )
}
export default TransactionsPage
