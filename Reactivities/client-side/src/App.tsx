import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="App">
    
      <ul>
        {activities.map((activity : any) => (
          <li key={activity.id}>{activity.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
