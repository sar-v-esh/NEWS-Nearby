import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import './news.css';

function News({ location }) {
  const [news, setNews] = useState([]);
  const [district, setDistrict] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform search logic if needed
    // For now, just log the search input
    console.log('Search submitted:', searchInput);
  };
  useEffect(() => {
    const fetchNews = async () => {
      let url;
      if (location.name) {
        url = `http://localhost:3001/api/location?name=${location.name}`;
      } else {
        url = `http://localhost:3001/api/location?latitude=${location.latitude}&longitude=${location.longitude}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('Server response:', data); // Log the entire response

        if (data && data.news) {
          const sortedNews = data.news.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

          setNews(sortedNews.slice(0, 24));
          setDistrict(data.district);
        } else {
          console.error('News data is undefined.');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [location]);

  
  return (
    <div className="news">
      {district && (
        <form onSubmit={handleSearchSubmit} className="searchForm">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search News"
            className="searchInput"
          />
          <button type="submit" className="searchButton">
            Search
          </button>
        </form>
      )}
      
      <div className="container">
      {Array.isArray(news) && news.length > 0 ? (
      news.map((item, index) => (
      <NewsCard key={index} title={item.title} link={item.link} />
      ))
        ) : (
      <p>No news available</p>
          )}
      </div>

    </div>
  );
}

export default News;
