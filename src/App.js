import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RegistrantList } from './RegistrantList';
import { RegistrationForm } from './RegistrationForm';

function App() {
  const [registrants, setRegistrants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const baseURL = `${window.location.protocol}//${window.location.hostname}`

  useEffect(() => {
    axios.get(baseURL + ':3001/registrants')
      .then(response => setRegistrants(response.data))
      .catch(error => console.error('Error loading registrants:', error));
  }, []);

  const handleAddRegistrant = (newRegistrant) => {
    axios.post(baseURL + ':3001/registrants', newRegistrant)
      .then(() => {
        setRegistrants([...registrants, newRegistrant]);
        setShowForm(false);
      })
      .catch(error => console.error('Error adding registrant:', error));
  };

  const handleDeleteRegistrant = (index, id) => {
    axios.delete(baseURL + ':3001/registrants/' + id)
      .then(() => {
        setRegistrants([...registrants, newRegistrant]);
        setShowForm(false);
      })
      .catch(error => console.error('Error adding registrant:', error));
    const updatedRegistrants = registrants.filter((_, i) => i !== index);
    setRegistrants(updatedRegistrants);
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {showForm ? (
        <div className="flex w-full max-w-[1500px]">
          <button
              onClick={() => setShowForm(false)}
              className="px-4 py-1 rounded-md hover:bg-gray-300 transition duration-300"
          >
          {"<"} 戻る
          </button>
        </div>
      ):(<div className="h-[32px]"></div>)}
        <div className="bg-white shadow-md rounded-lg p-6 w-full w-full max-w-[1500px] min-h-[800px]">
          {showForm ? (
            <RegistrationForm addRegistrant={handleAddRegistrant} />
          ) : (
            <RegistrantList registrants={registrants} onAddNew={() => setShowForm(true)} onDeleteRegistrant={handleDeleteRegistrant}/>
          )}
        </div>
      </div>
  )
}

export default App;