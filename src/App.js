import React, { useState, useEffect } from 'react';
import News from './News';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [inputLocation, setInputLocation] = useState('');
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="app">
      <h1 className="title">NEWS Nearby</h1>
      <div className="searchBox" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <form onSubmit={handleLocationSubmit} className="searchForm">
          <input type="text" value={inputLocation} onChange={handleLocationChange} placeholder={isHovered ? "Enter a keyword" : ""} className="searchInput" />
          {!isHovered && <i className="fas fa-search searchIcon"></i>}
        </form>
      </div>
      {location && <News location={location} />}
    </div>
  );
}

export default App;