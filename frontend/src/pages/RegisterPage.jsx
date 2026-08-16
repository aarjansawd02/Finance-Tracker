import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'
function RegisterPage () {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await registerUser(formData)
      login(res.data.user, res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className='auth-page'>
      <section className='auth-card register'>
        <p className='kicker'>No boring budgets</p>
        <h1>
          Start
          <br />
          loud.
        </h1>
        <p className='muted'>Make your money visible.</p>
        {error && <p className='message-error'>{error}</p>}
        <form className='form-stack' onSubmit={submit}>
          <input
            className='brutal-input'
            name='name'
            placeholder='YOUR NAME'
            value={formData.name}
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
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
          <button className='brutal-button mint' disabled={loading}>
            {loading ? 'Building...' : 'Build my tracker →'}
          </button>
        </form>
        <p className='muted'>
          Already registered? <Link to='/login'>Log in</Link>
        </p>
      </section>
    </main>
  )
}
export default RegisterPage
