import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './AllLogin.css';

function AllLogin() {
  const { error } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="content-section">
        <div className="site-title">
          <h1 className="banner-title">Navatar Remote Healthcare System</h1>
          <p className="banner-subtitle">
            Advanced telemedicine solutions for remote patient care and monitoring
          </p>
        </div>

        <div className="login-sections" style={{ display: 'flex', justifyContent: 'space-around' }}>
          
          {/* Super Admin */}
          <div className="login-section">
            <h2>Super Admin</h2>
            <div className="login-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M12 2C6.48 2 2 6.48...z" />
              </svg>
            </div>
            <div className="login-buttons">
              <div id="googleButton" className="google-button-container"></div>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>

          {/* Admin */}
          <div className="login-section">
            <h2>Admin</h2>
            <div className="login-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M12 2C6.48 2 2 6.48...z" />
              </svg>
            </div>
            <div className="login-buttons">
              <div id="googleButton" className="google-button-container"></div>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>

          {/* User */}
          <div className="login-section">
            <h2>User</h2>
            <div className="login-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M12 2C6.48 2 2 6.48...z" />
              </svg>
            </div>
            <div className="login-buttons">
              <button onClick={() => navigate('/user')}>User Login</button>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '50%',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <img
          src="/telemedicine-robot.jpeg"
          alt="Telemedicine Robot"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
    </div>
  );
}

export default AllLogin;
