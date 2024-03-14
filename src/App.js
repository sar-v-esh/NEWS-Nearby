import React, { useState, useEffect } from 'react';
import News from './News';
import Background from './Background'; // import the Background component
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [inputLocation, setInputLocation] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log(`lat: ${latitude}, long: ${longitude}`);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    setTimeout(() => {
      setIsLoading(false); // Add this line
    }, 2500); // Adjust this value to increase or decrease the loading time
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
      <Background /> {/* Add the Background component */}
      <h1 className="title__dynamic">NEWS Nearby</h1>
      <div className="searchBox" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <form onSubmit={handleLocationSubmit} className="searchForm">
          <input type="text" value={inputLocation} onChange={handleLocationChange} placeholder={isHovered ? "Enter a keyword" : ""} className="searchInput" />
          {!isHovered && <i className="fas fa-search searchIcon"></i>}
        </form>
      </div>
      {isLoading ? (
        <div className="app__preloader">
          
          {<main>
	<svg class="ip" viewBox="0 0 256 128" width="100px" height="50px" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
				<stop offset="10%" stop-color="#5ebd3e" />
				<stop offset="23%" stop-color="#ffb900" />
				<stop offset="57%" stop-color="#f78200" />
				<stop offset="70%" stop-color="#e23838" />
			</linearGradient>
			<linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
				<stop offset="10%" stop-color="#e23838" />
				<stop offset="23%" stop-color="#973999" />
				<stop offset="57%" stop-color="#009cdf" />
				<stop offset="70%" stop-color="#5ebd3e" />
			</linearGradient>
		</defs>
		<g fill="none" stroke-linecap="round" stroke-width="16">
			<g class="ip__track" stroke="#ddd">
				<path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
			<g stroke-dasharray="180 656">
				<path class="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path class="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
		</g>
	</svg>
</main>}
        </div>
      ) : (
        location && <News location={location} />
      )}
    </div>
  );
}

export default App;
