import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

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
    <div style={styles.news}>
      

      

      {district && (
        <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search News"
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            Search
          </button>
        </form>
      )}

      <div style={styles.cardsContainer}>
        {Array.isArray(news) && news.length > 0 ? (
          news.map((item, index) => (
            <NewsCard key={index} title={item.title} link={item.link} image={item.image} />
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
}


const styles = {
  news: {
   
    borderRadius: '4px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr',
  },
  title: {
    fontSize: '1.5em',
    marginBottom: '20px',
    textAlign: 'center',
    gridRow: '1',
  },
  searchForm: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Add this line
    marginBottom: '20px',
    gridRow: '2',
  },
  searchInput: {
    fontSize: '1em',
    padding: '8px',
    marginRight: '8px',
  },
  searchButton: {
    fontSize: '1em',
    padding: '8px',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '50px',
    alignItems: 'stretch',
    gridRow: '3', // Change from 2 to 3
  },
};

export default News;
