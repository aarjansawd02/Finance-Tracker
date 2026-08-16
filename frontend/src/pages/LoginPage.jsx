import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'
function LoginPage () {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await loginUser(formData)
      login(res.data.user, res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className='auth-page'>
      <section className='auth-card'>
        <p className='kicker'>Your money, unfiltered</p>
        <h1>
          Welcome
          <br />
          back.
        </h1>
        <p className='muted'>Get the numbers that matter.</p>
        {error && <p className='message-error'>{error}</p>}
        <form className='form-stack' onSubmit={submit}>
          <input
            className='brutal-input'
            type='email'
            name='email'
            placeholder='EMAIL ADDRESS'
            value={formData.email}
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
          <input
            className='brutal-input'
            type='password'
            name='password'
            placeholder='PASSWORD'
            value={formData.password}
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
          <button className='brutal-button yellow' disabled={loading}>
            {loading ? 'Opening...' : 'Enter tracker →'}
          </button>
        </form>
        <p className='muted'>
          New here? <Link to='/register'>Create an account</Link>
        </p>
      </section>
    </main>
  )
}
export default LoginPage
