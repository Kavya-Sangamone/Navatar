import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/company')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch companies');
        return res.json();
      })
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/company/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCompanies(companies.filter((company) => company.company_id !== id));
      })
      .catch((err) => console.error('Delete failed:', err));
  };

  const handleEdit = (company) => {
    // Navigate or open modal to edit (you can implement it based on your routing)
    alert(`Edit Company: ${company.name}`);
  };

  return (
    <div className="app-container"> {/* 👈 ONE parent element */}
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Navatar Health</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/companies" className="nav-item">Companies</Link>
          <Link to="/navatars" className="nav-item">Navatars</Link>
          <Link to="/admins" className="nav-item">Admins</Link>
          <Link to="/doctors" className="nav-item">Doctors</Link>
        </nav>
        
      </div>
      <div>
          <button className="add-company-btn">
            <Link to="/companies">Add Company</Link>
          </button>
        </div>

      {/* Main Content */}
      <div className="main-content">
      <div className="top-bar">
      <button className="add-company-btn">
        <Link to="/companies">Add Company</Link>
      </button>
    </div>
        <h3>Registered Companies</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="company-grid">
          {companies.map((company) => (
            <div className="company-card" key={company.company_id}>
              <h4>{company.name}</h4>
              <p><strong>Pincode:</strong> {company.pincode}</p>
              <p><strong>Country:</strong> {company.country}</p>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(company)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(company.company_id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
