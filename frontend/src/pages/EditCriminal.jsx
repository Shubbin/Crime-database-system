import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCriminal = () => {
  const { criminalId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    name: '',
    crime: '',
    date: ''
  });

  useEffect(() => {
    const fetchCriminal = async () => {
      try {
        const response = await axios.get(`/api/criminals`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const criminal = response.data.find(c => c._id === criminalId);
        if (criminal) {
          setFormData({
            name: criminal.name,
            crime: criminal.crime,
            date: criminal.date
          });
        }
      } catch (error) {
        console.error('Error fetching criminal:', error);
      }
    };

    fetchCriminal();
  }, [criminalId, token]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/criminals/update/${criminalId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Criminal updated successfully!');
      navigate('/criminals'); // go back to view page
    } catch (error) {
      console.error('Error updating criminal:', error);
      alert('Failed to update. Only admin/police allowed.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Criminal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Name"
          required
        />
        <input
          name="crime"
          value={formData.crime}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Crime"
          required
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditCriminal;
