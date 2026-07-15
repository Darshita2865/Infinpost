import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { 
  FaHome, 
  FaInfoCircle, 
  FaChartBar, 
  FaSignInAlt, 
  FaUserPlus, 
  FaSignOutAlt 
} from 'react-icons/fa';
import "./Navbar.css";
import logo from "../../assets/images/logo.png";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="logo-section">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <ul>
        <li className={isActive('/')}>
          <Link to="/">
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li className={isActive('/about')}>
          <Link to="/about">
            <FaInfoCircle />
            <span>About</span>
          </Link>
        </li>
        <li className={isActive('/results')}>
          <Link to="/results">
            <FaChartBar />
            <span>Results</span>
          </Link>
        </li>
      </ul>

      <div className="nav-actions">
        <ThemeToggle />
        
        {isAuthenticated ? (
          <div className="auth-user">
            <Link to="/profile" className="profile-link">
              <div className="profile-avatar-mini">
                {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </div>
              <span className="username">{user?.name || user?.username}</span>
            </Link>
            <button className="logout-btn-mini" onClick={handleLogout} title="Logout">
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn-nav">
              <FaSignInAlt />
              <span>Sign In</span>
            </Link>
            <Link to="/register" className="register-btn-nav">
              <FaUserPlus />
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;