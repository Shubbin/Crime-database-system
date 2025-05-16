import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [criminals, setCriminals] = useState([]);

  useEffect(() => {
    // Fetch criminal data for users to view
    axios.get('/api/user/criminals')
      .then(response => setCriminals(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">User Dashboard</h2>

      <section>
        <h3 className="text-xl mb-2">Criminals</h3>
        <ul>
          {criminals.map((criminal) => (
            <li key={criminal.id}>
              <span>{criminal.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default UserDashboard;
