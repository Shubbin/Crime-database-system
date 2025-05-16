import React, { useEffect, useState } from "react";
import axios from "axios";
import * as jwt_decode from 'jwt-decode';

;
import { Link } from "react-router-dom";

const ViewCriminals = () => {
  const [criminals, setCriminals] = useState([]);
  const token = localStorage.getItem("token");
  const user = token ? jwt_decode(token) : null;

  useEffect(() => {
    const fetchCriminals = async () => {
      try {
        const response = await axios.get("/api/criminals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCriminals(response.data);
      } catch (error) {
        console.error("Error fetching criminals:", error);
      }
    };

    fetchCriminals();
  }, [token]);

  const handleDelete = async (criminalId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`/api/criminals/delete/${criminalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCriminals((prev) => prev.filter((c) => c._id !== criminalId));
    } catch (error) {
      console.error("Error deleting criminal:", error);
      alert("Only admin can delete.");
    }
  };

  return (
    <div className="bg-lightBlue min-h-screen py-8 px-6">
      <h2 className="text-3xl font-bold text-darkGray text-center mb-6">
        Criminal Records
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <ul className="space-y-4">
          {criminals.map((criminal) => (
            <li key={criminal._id} className="border-b pb-4">
              <h3 className="text-xl font-semibold text-darkGray">
                {criminal.name}
              </h3>
              <p className="text-gray-700">{criminal.crime}</p>
              <p className="text-gray-600">Date: {criminal.date}</p>
              {criminal.addedBy && (
                <p className="text-sm text-gray-500">
                  Added by: {criminal.addedBy.fullname} ({criminal.addedBy.role})
                </p>
              )}

              {(user?.role === "admin" || user?.role === "police") && (
                <Link to={`/edit-criminal/${criminal._id}`}>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mt-2 mr-2">
                    Edit
                  </button>
                </Link>
              )}

              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(criminal._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded mt-2"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewCriminals;
