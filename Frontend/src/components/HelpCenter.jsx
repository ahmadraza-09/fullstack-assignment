import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/HelpCenter.css';
import HelpCard from './HelpCard';

const HelpCenter = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:3060/card/cardslist');
        setCards(response.data);
        setFilteredCards(response.data); // Initialize filteredCards with fetched data
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    // Filter cards based on the search term
    const filtered = cards.filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='help-center'>
      <div className="hero-section">
        <h2>How can we help?</h2>
        <div className="search-section">
          <input
            type="text"
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i
            className="fa-solid fa-arrow-right"
            onClick={handleSearchClick}
          ></i>
        </div>
      </div>

      <div className="help-card-list">
        {filteredCards.map((card, index) => (
          <HelpCard
            key={index}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
