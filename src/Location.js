// Location.js
import React, { useEffect } from 'react';
import axios from 'axios';

function Location({ onLocationChange }) {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get('http://localhost:3001/api/location', {
            params: { latitude, longitude }
          });

          console.log('Server response:', response.data);
          onLocationChange({ latitude, longitude });
        } catch (error) {
          console.error('Error sending location to server:', error);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [onLocationChange]);

  
}

const styles = {
  location: {
    marginBottom: '20px',
  },
};

export default Location;
