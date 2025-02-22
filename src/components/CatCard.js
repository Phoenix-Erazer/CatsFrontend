import React from 'react';
import './CatCard.css';

const CatCard = ({ title, imageUrl, onClick }) => {
  return (
    <div className="cat-card" onClick={onClick}>  
      <img src={imageUrl} alt={title} className="cat-image" />
      <h3>{title}</h3>
    </div>
  );
};

export default CatCard;
