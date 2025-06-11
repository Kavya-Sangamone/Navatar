import './App.css';
import { useAuth } from './hooks/useAuth';
import AddCompany from './components/AddCompany';

function App() {
  const { logout, user, error, isAuthenticated } = useAuth();

  return (
    <div className="App">
      {!isAuthenticated ? (
        <div className="login-container">
          <div className="content-section">
            <div className="site-title">
              <h1 className="banner-title">Navatar Remote Healthcare System</h1>
              <p className="banner-subtitle">
                Advanced telemedicine solutions for remote patient care and monitoring
              </p>
            </div>

            <div className="login-sections">
              <div className="login-section">
                <h2>Super Admin</h2>
                <div className="login-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <div className="login-buttons">
                  <div id="googleButton" className="google-button-container"></div>
                  {error && <p className="error-message">{error}</p>}
                </div>
              </div>

              <div className="login-section">
                <h2>Admin</h2>
                <div className="login-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <button className="login-button admin">
                  Admin Login
                </button>
              </div>

              <div className="login-section">
                <h2>User</h2>
                <div className="login-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <button className="login-button user">
                  User Login
                </button>
              </div>
            </div>
          </div>

          <div className="banner-wrapper">
            <div className="banner-image">
              <img 
                src="/telemedicine-robot.jpeg" 
                alt="Telemedicine Robot in Hospital Corridor" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-container">
          <nav className="dashboard-nav">
            <div className="user-info">
              <img src={user.picture} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
            </div>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </nav>
          <main className="dashboard-content">
            <AddCompany />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
