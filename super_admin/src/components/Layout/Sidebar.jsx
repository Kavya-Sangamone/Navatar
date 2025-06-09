import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Navatar Health</h2>
      </div>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="nav-item">
          <i className="fas fa-home"></i>
          Dashboard
        </Link>
        <Link to="/companies" className="nav-item">
          <i className="fas fa-building"></i>
          Companies
        </Link>
        <Link to="/navatars" className="nav-item">
          <i className="fas fa-robot"></i>
          Navatars
        </Link>
        <Link to="/admins" className="nav-item">
          <i className="fas fa-users-cog"></i>
          Admins
        </Link>
        <Link to="/doctors" className="nav-item">
          <i className="fas fa-user-md"></i>
          Doctors
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar; 