import './App.css';
import { useAuth } from './hooks/useAuth';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCompany from './components/AddCompany';


function App() {
  const { error, isAuthenticated } = useAuth();

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

            <div className="login-sections" style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row'}}>
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
                <div className="login-buttons">
                  <div id="googleButton" className="google-button-container"></div>
                  {error && <p className="error-message">{error}</p>}
                </div>
              </div>

              <div className="login-section">
                <h2>User</h2>
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
            </div>
          </div>
          <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: '50%', // Adjust to how much of the screen you want the image to occupy
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
      ) : (
        <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/dashboard" element={<Home />} />
        <Route path="/companies" element={<AddCompany />} />
        
        </Routes>
      )}
    </div>
    
  );
}


export default App;
