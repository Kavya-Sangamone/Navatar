import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import CompanyList from './components/Companies/CompanyList';
import NavatarList from './components/Navatars/NavatarList';
import AdminList from './components/Admins/AdminList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/companies" replace />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/navatars" element={<NavatarList />} />
            <Route path="/admins" element={<AdminList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
