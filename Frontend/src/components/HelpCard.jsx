import React from 'react';
import '../css/HelpCard.css';

const HelpCard = ({ title, description }) => {
  return (
    <div className='help-card'>
      <h3 className="title">{title}</h3>
      <hr />
      <p className="description">{description}</p>
    </div>
  );
};

export default HelpCard;
