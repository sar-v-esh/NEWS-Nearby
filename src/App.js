import React, { useState, useEffect } from 'react';
import News from './News';

function App() {
  const [location, setLocation] = useState(null);
  const [inputLocation, setInputLocation] = useState('');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleLocationChange = (event) => {
    setInputLocation(event.target.value);
  };

  const handleLocationSubmit = (event) => {
    event.preventDefault();
    if (inputLocation) {
      setLocation({ name: inputLocation });
    }
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.h1}>News Nearby</h1>
      <form onSubmit={handleLocationSubmit} style={styles.form}>
        <input type="text" value={inputLocation} onChange={handleLocationChange} placeholder="Enter a location" style={styles.input} />
        <button type="submit" style={styles.button}>Fetch News</button>
      </form>
      {location && <News location={location} />}

    </div>
  );
}

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#add8e6', // Light blue color
  },
  
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    padding:'20px' // Updated from marginBottom to marginTop
  },
  input: {
    fontSize: '1.2em',
    padding: '10px',
    width: '60%',
    marginBottom: '10px',
  },
  button: {
    fontSize: '1em',
    padding: '10px',
  },

  h1:{
    fontFamily: "Peralta",
    fontWeight: "400",
    textAlign:"center",
    fontStyle: "normal",
  }
};

export default App;
