import React, { useState, useEffect } from 'react';
import API from '../../api';
import './Navatars.css';

const NavatarList = () => {
  const [navatars, setNavatars] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [newNavatar, setNewNavatar] = useState({
    company_id: '',
    navatar_name: '',
    location: '',
    status: 'Available',
    model: 'Telepresence Robot v1',
    features: ['Video Conferencing', 'Remote Control', 'Auto-Navigation']
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNavatars();
    fetchCompanies();
  }, []);

  const fetchNavatars = async () => {
    try {
      const response = await API.get('/navatar');
      setNavatars(response.data);
    } catch (error) {
      console.error('Error fetching navatars:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await API.get('/company');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewNavatar({
      ...newNavatar,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/navatar', newNavatar);
      setNewNavatar({
        company_id: '',
        navatar_name: '',
        location: '',
        status: 'Available',
        model: 'Telepresence Robot v1',
        features: ['Video Conferencing', 'Remote Control', 'Auto-Navigation']
      });
      setIsModalOpen(false);
      fetchNavatars();
    } catch (error) {
      console.error('Error adding navatar:', error);
    }
  };

  return (
    <div className="navatars-container">
      <div className="navatars-header">
        <h1>Navatar Management</h1>
        <button 
          className="add-button"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="fas fa-plus"></i> Add Navatar
        </button>
      </div>

      <div className="navatars-grid">
        {navatars.map((navatar) => (
          <div key={navatar.navatar_id} className="navatar-card">
            <div className="navatar-image">
              {/* <img src={robotImage} alt="Telepresence Robot" /> */}
              <span className={`status-badge ${navatar.status.toLowerCase()}`}>
                {navatar.status}
              </span>
            </div>
            <div className="navatar-card-content">
              <h3>{navatar.navatar_name}</h3>
              <p className="location">
                <i className="fas fa-map-marker-alt"></i> {navatar.location}
              </p>
              <div className="features">
                <h4>Features:</h4>
                <ul>
                  {navatar.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="navatar-card-footer">
                <button className="control-button">
                  <i className="fas fa-gamepad"></i> Control
                </button>
                <button className="settings-button">
                  <i className="fas fa-cog"></i> Settings
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Navatar</h2>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="navatar-form">
              <div className="form-group">
                <label>Company *</label>
                <select
                  name="company_id"
                  value={newNavatar.company_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.company_id} value={company.company_id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Navatar Name *</label>
                <input
                  type="text"
                  name="navatar_name"
                  value={newNavatar.navatar_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter navatar name"
                />
              </div>
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={newNavatar.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter location"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add Navatar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavatarList; 