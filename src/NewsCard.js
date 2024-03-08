import React from 'react';

function NewsCard({ title, link, image }) {
  return (
    <div style={styles.card}>
      {image && <img src={image} alt={title} style={styles.image} />}
      <h3 style={styles.title}>{title}</h3>
      <div style={styles.buttonContainer}>
        <a href={link} target="_blank" rel="noopener noreferrer" style={styles.readMoreButton}>
          Read More
        </a>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '8px',
  },
  title: {
    fontSize: '1em',
    marginBottom: '8px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  readMoreButton: {
    fontSize: '0.9em',
    color: '#fff',
    backgroundColor: '#007BFF',
    textDecoration: 'none',
    padding: '10px',
    borderRadius: '4px',
  },
};

export default NewsCard;
