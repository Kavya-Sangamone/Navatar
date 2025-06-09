import React,{useState} from 'react';   
import API from '../api';

const AddCompany = () => {
    const [company, setCompany] = useState({
        name: '',
        pincode: '',
        country: '',
    });

    const handleChange = (e) => {
        setCompany({...company, [e.target.name]: e.target.value});
};
const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/company', company)
    .then(res => {
        console.log(res);
        // Clear form after successful submission
        setCompany({ name: '', pincode: '', country: '' });
    })
    .catch(err => {
        console.log(err);
    });
};
return (
    <div>
        <h1>Add Company</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={company.name} onChange={handleChange} required />
            <input type="text" name="pincode" placeholder="Pincode" value={company.pincode} onChange={handleChange} />
            <input type="text" name="country" placeholder="Country" value={company.country} onChange={handleChange} />
            <button type="submit">Add Company</button>
        </form>
    </div>
);
};
export default AddCompany;