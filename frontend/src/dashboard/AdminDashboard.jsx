import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [criminals, setCriminals] = useState([]);
  const [users, setUsers] = useState([]);
  const [police, setPolice] = useState([]);

  useEffect(() => {
    // Fetch criminal data, users, and police data for admin
    axios.get('/api/admin/criminals')
      .then(response => setCriminals(response.data))
      .catch(error => console.error(error));

    axios.get('/api/admin/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));

    axios.get('/api/admin/police')
      .then(response => setPolice(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDeleteCriminal = (criminalId) => {
    axios.delete(`/api/admin/criminals/${criminalId}`)
      .then(() => {
        setCriminals(criminals.filter(criminal => criminal.id !== criminalId));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Admin Dashboard</h2>

      <section>
        <h3 className="text-xl mb-2">Criminals</h3>
        <ul>
          {criminals.map((criminal) => (
            <li key={criminal.id} className="flex justify-between">
              <span>{criminal.name}</span>
              <div>
                <button onClick={() => handleDeleteCriminal(criminal.id)} className="bg-red-500 text-white p-1 mr-2">Delete</button>
                <button className="bg-yellow-500 text-white p-1 mr-2">Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="text-xl mb-2">Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="text-xl mb-2">Police</h3>
        <ul>
          {police.map((officer) => (
            <li key={officer.id}>
              {officer.name} ({officer.email})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
// This component fetches and displays a list of criminals, users, and police officers from the server.
// It allows the admin to delete criminals and view user and police information.