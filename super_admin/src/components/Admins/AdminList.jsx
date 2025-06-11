import React, { useState, useEffect } from 'react';
import API from '../../../../navatar-phase1/frontend/src/api';
import './Admins.css';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [navatars, setNavatars] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    company_id: '',
    navatar_id: '',
    admin_name: '',
    admin_email: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAdmins();
    fetchCompanies();
    fetchNavatars();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await API.get('/admin');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
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

  const fetchNavatars = async () => {
    try {
      const response = await API.get('/navatar');
      setNavatars(response.data);
    } catch (error) {
      console.error('Error fetching navatars:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admin', newAdmin);
      setNewAdmin({
        company_id: '',
        navatar_id: '',
        admin_name: '',
        admin_email: '',
      });
      setIsModalOpen(false);
      fetchAdmins();
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const getCompanyName = (companyId) => {
    const company = companies.find(c => c.company_id === companyId);
    return company ? company.name : 'Unknown Company';
  };

  const getNavatarName = (navatarId) => {
    const navatar = navatars.find(n => n.navatar_id === navatarId);
    return navatar ? navatar.navatar_name : 'Unknown Navatar';
  };

  return (
    <div className="admins-container">
      <div className="admins-header">
        <h1>Admin Management</h1>
        <button 
          className="add-button"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="fas fa-plus"></i> Add Admin
        </button>
      </div>

      <div className="admins-grid">
        {admins.map((admin) => (
          <div key={admin.admin_id} className="admin-card">
            <div className="admin-avatar">
              <i className="fas fa-user-shield"></i>
            </div>
            <div className="admin-card-content">
              <h3>{admin.admin_name}</h3>
              <p className="admin-email">
                <i className="fas fa-envelope"></i> {admin.admin_email}
              </p>
              <div className="admin-details">
                <p>
                  <i className="fas fa-building"></i> {getCompanyName(admin.company_id)}
                </p>
                <p>
                  <i className="fas fa-robot"></i> {getNavatarName(admin.navatar_id)}
                </p>
              </div>
              <div className="admin-card-footer">
                <button className="edit-button">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="permissions-button">
                  <i className="fas fa-key"></i> Permissions
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
              <h2>Add New Admin</h2>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Company *</label>
                <select
                  name="company_id"
                  value={newAdmin.company_id}
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
                <label>Navatar *</label>
                <select
                  name="navatar_id"
                  value={newAdmin.navatar_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Navatar</option>
                  {navatars
                    .filter(navatar => !newAdmin.company_id || navatar.company_id === newAdmin.company_id)
                    .map((navatar) => (
                      <option key={navatar.navatar_id} value={navatar.navatar_id}>
                        {navatar.navatar_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label>Admin Name *</label>
                <input
                  type="text"
                  name="admin_name"
                  value={newAdmin.admin_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter admin name"
                />
              </div>
              <div className="form-group">
                <label>Admin Email *</label>
                <input
                  type="email"
                  name="admin_email"
                  value={newAdmin.admin_email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter admin email"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminList; 