import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className='brutal-nav'>
      <div className='brand'>
        Ledger
        <small>{user?.name || 'Tracker'}</small>
      </div>

      <div className='nav-actions'>
        <NavLink
          to='/'
          end
          className={({ isActive }) =>
            `brutal-button ${isActive ? 'active yellow' : 'white'}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to='/transactions'
          className={({ isActive }) =>
            `brutal-button ${isActive ? 'active yellow' : 'white'}`
          }
        >
          Transactions
        </NavLink>

        <button className='brutal-button mint' type='button' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
