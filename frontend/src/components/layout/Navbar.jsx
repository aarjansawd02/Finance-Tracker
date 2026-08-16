import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (path) => location.pathname === path
  return <nav className="brutal-nav"><div className="brand">Money//Matter<small>Hi, {user?.name || 'planner'}</small></div><div className="nav-actions"><button className={`brutal-button ${isActive('/') ? 'active mint' : 'white'}`} onClick={() => navigate('/')}>Dashboard</button><button className={`brutal-button ${isActive('/transactions') ? 'active yellow' : 'white'}`} onClick={() => navigate('/transactions')}>Transactions</button><button className="brutal-button danger" onClick={() => { logout(); navigate('/login') }}>Log out</button></div></nav>
}
export default Navbar
