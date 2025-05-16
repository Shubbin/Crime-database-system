// Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    dob: '',
    address: '',
    maritalStatus: 'single',
    nextOfKin: {
      fullname: '',
      relationship: '',
      phone: '',
      address: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('nextOfKin.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        nextOfKin: {
          ...prev.nextOfKin,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4500/api/auth/signup', formData);
      alert(response.data.message || 'Signup successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md mt-10 rounded">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} required className="input" />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input" />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="input" />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} required className="input" />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="input" />
        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="input">
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
        </select>
        <input name="nextOfKin.fullname" placeholder="Next of Kin Full Name" value={formData.nextOfKin.fullname} onChange={handleChange} required className="input" />
        <input name="nextOfKin.relationship" placeholder="Relationship" value={formData.nextOfKin.relationship} onChange={handleChange} required className="input" />
        <input name="nextOfKin.phone" placeholder="Phone Number" value={formData.nextOfKin.phone} onChange={handleChange} required className="input" />
        <input name="nextOfKin.address" placeholder="Address" value={formData.nextOfKin.address} onChange={handleChange} required className="input" />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Sign Up</button>
      </form>
      <p className="text-center mt-4">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
    </div>
  );
};

export default Signup;
