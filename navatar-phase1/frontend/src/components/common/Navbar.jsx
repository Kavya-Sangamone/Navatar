import { useNavigate } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  // const { user, logout } = useAuth();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate('/');
  // };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <span className="logo-text">Navatar</span>
        </div>
        
        
          <div className="navbar-user">
            <span className="user-welcome">Welcome, Dr. </span>
            <button className="btn btn-secondary btn-sm">
              Logout
            </button>
          </div>
         : (
          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )
      </div>
    </nav>
  );
}

export default Navbar;