import { useState, useEffect } from 'react'
import { getTransactions, createTransaction, deleteTransaction, updateTransaction } from '../api/transaction.api'
import { getCategories, createCategory } from '../api/category.api'

export function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAll = async () => {
    try {
      const [txRes, catRes] = await Promise.all([getTransactions(), getCategories()])
      setTransactions(Array.isArray(txRes.data.transactions) ? txRes.data.transactions : [])
      setCategories(Array.isArray(catRes.data) ? catRes.data : [])
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const addTransaction = async (data) => {
    const res = await createTransaction(data)
    setTransactions((prev) => [res.data.transaction, ...prev])
  }

  const removeTransaction = async (id) => {
    await deleteTransaction(id)
    setTransactions((prev) => prev.filter((t) => t._id !== id))
  }

  const editTransaction = async (id, data) => {
    const res = await updateTransaction(id, data)
    setTransactions((prev) => prev.map((t) => t._id === id ? res.data.transaction : t))
  }

  const addCategory = async (data) => {
    const res = await createCategory(data)
    const cat = res.data.category
    setCategories((prev) => [...prev, cat])
    return cat
  }

  return { transactions, categories, loading, error, addTransaction, removeTransaction, addCategory, editTransaction }
}
