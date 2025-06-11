import React, { useState } from 'react';
import API from '../../../navatar-phase1/frontend/src/api';
import './AddCompany.css';

const AddCompany = () => {
    const [company, setCompany] = useState({
        name: '',
        pincode: '',
        country: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
        // Clear messages when user starts typing
        setError('');
        setSuccess('');
    };

    const validateForm = () => {
        if (!company.name.trim()) {
            setError('Company name is required');
            return false;
        }
        if (company.pincode && !/^\d{6}$/.test(company.pincode)) {
            setError('Pincode must be 6 digits');
            return false;
        }
        if (!company.country.trim()) {
            setError('Country is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await API.post('/company', company);
            setSuccess('Company added successfully!');
            setCompany({ name: '', pincode: '', country: '' });
            console.log('Company added:', res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add company. Please try again.');
            console.error('Error adding company:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-company-container">
            <div className="add-company-card">
                <h1 className="add-company-title">Add New Company</h1>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <form onSubmit={handleSubmit} className="add-company-form">
                    <div className="form-group">
                        <label htmlFor="name">Company Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter company name"
                            value={company.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            placeholder="Enter 6-digit pincode"
                            value={company.pincode}
                            onChange={handleChange}
                            pattern="[0-9]{6}"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Enter country"
                            value={company.country}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Adding Company...' : 'Add Company'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCompany;