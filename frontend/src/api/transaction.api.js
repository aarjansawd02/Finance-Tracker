import axiosInstance from './axiosInstance'

export const getTransactions = () => axiosInstance.get('/transactions')
export const createTransaction = (data) => axiosInstance.post('/transactions', data)
export const deleteTransaction = (id) => axiosInstance.delete(`/transactions/${id}`)
export const updateTransaction = (id, data) => axiosInstance.put(`/transactions/${id}`, data)