import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the Flask backend
    fetch(`${process.env.REACT_APP_API_URL}/api/data`)
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
