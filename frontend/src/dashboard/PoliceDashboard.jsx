import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PoliceDashboard = () => {
  const [criminals, setCriminals] = useState([]);

  useEffect(() => {
    // Fetch criminal data for police to view and edit
    axios.get('/api/police/criminals')
      .then(response => setCriminals(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEditCriminal = (criminalId) => {
    // Logic to edit criminal details (open a modal or a new page)
    console.log('Edit criminal with ID:', criminalId);
  };

  const handleAddCriminal = () => {
    // Logic to add a new criminal (open a form or a modal)
    console.log('Add a new criminal');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Police Dashboard</h2>

      <button onClick={handleAddCriminal} className="bg-green-500 text-white p-2 mb-4">Add Criminal</button>

      <section>
        <h3 className="text-xl mb-2">Criminals</h3>
        <ul>
          {criminals.map((criminal) => (
            <li key={criminal.id} className="flex justify-between">
              <span>{criminal.name}</span>
              <button onClick={() => handleEditCriminal(criminal.id)} className="bg-yellow-500 text-white p-1">Edit</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PoliceDashboard;

// This component fetches and displays a list of criminals from the server.
