import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Home from './components/Home';
import AddCompany from './components/AddCompany';
import LandingPage from './components/LandingPage';
import AllLogin from './components/AllLogin'; // <- Your new login page

function App() {
  const { isAuthenticated } = useAuth();

  return (
    
      <Routes>
        
        {/* Public routes */}
        <Route path="/login" element={<AllLogin />} />
        <Route path="/user" element={<LandingPage />} /> {/* Accessible without auth */}

        {/* Protected routes */}
        {isAuthenticated && (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/companies" element={<AddCompany />} />
          </>
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      
      </Routes>
    
  );
}

export default App;
