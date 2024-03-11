import React from 'react';
import './newscard.css'

function NewsCard({ title, link }) {
  return (
    <div className="card">
      <div className="box">
        <div className="content">
          <h3>{title}</h3>
            <div className="newsContent">
              {/* Your news content goes here */}
            </div>
            <a href={link} target="_blank" rel="noopener noreferrer" className="readMoreButton">
              Read More
            </a>
       </div>

      </div>
    </div>
  );
}

export default NewsCard;
