import React, { useState, useEffect } from 'react';
import API from '../../../../navatar-phase1/frontend/src/api';
import './Companies.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    pincode: '',
    country: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await API.get('/company');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewCompany({
      ...newCompany,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/company', newCompany);
      setNewCompany({ name: '', pincode: '', country: '' });
      setIsModalOpen(false);
      fetchCompanies();
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  return (
    <div className="companies-container">
      <div className="companies-header">
        <h1>Company Management</h1>
        <button 
          className="add-button"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="fas fa-plus"></i> Add Company
        </button>
      </div>

      <div className="companies-grid">
        {companies.map((company) => (
          <div key={company.company_id} className="company-card">
            <div className="company-card-header">
              <h3>{company.name}</h3>
              <span className="company-id">ID: {company.company_id}</span>
            </div>
            <div className="company-card-body">
              <p><i className="fas fa-map-marker-alt"></i> {company.country || 'Country not specified'}</p>
              <p><i className="fas fa-hashtag"></i> {company.pincode || 'Pincode not specified'}</p>
            </div>
            <div className="company-card-footer">
              <button className="edit-button">
                <i className="fas fa-edit"></i> Edit
              </button>
              <button className="view-button">
                <i className="fas fa-eye"></i> View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Company</h2>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="company-form">
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newCompany.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter company name"
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={newCompany.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter pincode"
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={newCompany.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyList; 