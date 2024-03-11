const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Parser = require('rss-parser');
const rateLimit = require('axios-rate-limit');

const parser = new Parser();

const app = express();
app.use(cors());

// Create an instance of axios for rate limiting to avoid cost 
const axiosInstance = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1000 });

app.get('/api/location', async (req, res) => {
  const { latitude, longitude, name } = req.query;

  let city, state;

  if (name) {
    city = name;
    state = 'Antartica'; 
    // Add a default value for state
    console.log(city)
  } else if (latitude && longitude) {
    // Reverse geocoding with RapidAPI using axiosInstance
    const rapidApiResponse = await axiosInstance({
      method: 'GET',
      url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse',
      params: { lat: latitude, lon: longitude, 'accept-language': 'en', polygon_threshold: '0.0' },
      headers: {
        'X-RapidAPI-Key': 'f97b0395cdmsh04958b4c57561a5p10a4adjsn21d50b6e3b2d',
        'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
      }
    });

    const address = rapidApiResponse.data.address;

    console.log('Address:', address);
    // Log the entire address object for testing purpose

    // Check for different address components not all has same output style
    city = address?.city || address?.suburb || address?.neighbourhood || address?.district;
    state = address?.state;
  }

  if (!city || !state) 
  //if not any type is given as output
  {
    console.error('City or state information not available in the response.');
    res.status(500).json({ error: 'City or state information not available' });
    return;
  }

  console.log('City:', city);

  // Fetch news for the city
  const feed = await parser.parseURL(`https://news.google.com/rss?hl=en&q=${city}`);
  console.log('News Feed:', feed); 
  // Log the entire feed object for checking

  if (!feed || !feed.items || feed.items.length === 0) 
  //error handling
  {
    console.error('News data is undefined or empty.');
    res.status(500).json({ error: 'News data is undefined or empty' });
    return;
  }
  //check below lines
  const newsWithImages = feed.items.map(item => {
    const image = item['media:content'] ? item['media:content']['$'].url : null;
    return { ...item, image };
  });

  res.json({ news: feed.items, city, state ,news:newsWithImages});
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
