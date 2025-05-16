import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AddCriminal = () => {
  const [formData, setFormData] = useState({ name: "", crime: "", date: "" });
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const user = token ? jwt_decode(token) : null;
  const navigate = useNavigate();

  if (!token || !["admin", "police"].includes(user?.role)) {
    toast.error("Access denied. Only police or admin can add records.");
    navigate("/login");
    return null;
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.crime.trim()) newErrors.crime = "Crime is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post(
        "/api/criminals/add",
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Criminal added successfully");
      navigate("/view-criminals");
    } catch (error) {
      console.error("Error adding criminal:", error);
      toast.error("Failed to add criminal");
    }
  };

  return (
    <div className="min-h-screen bg-lightBlue flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-darkGray mb-6 text-center">
          Add New Criminal Record
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Crime</label>
          <input
            type="text"
            name="crime"
            value={formData.crime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          {errors.crime && <p className="text-red-600 text-sm">{errors.crime}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCriminal;
