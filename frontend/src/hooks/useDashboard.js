import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

export function useDashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get('/dashboard/summary')
        setSummary(res.data)
      } catch (err) {
        setError('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [])

  return { summary, loading, error }
}