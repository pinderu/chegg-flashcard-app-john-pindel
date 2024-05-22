import React, { useState, useEffect } from 'react';
import Card from './Card';
import { listDecks } from '../utils/api/index'; 
import { useNavigate } from 'react-router-dom';


const Decks = () => {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    listDecks(controller.signal)
      .then(setDecks)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="decks-container">
        <button 
        className="btn btn-primary mb-3"
        onClick={() => navigate('/decks/new')}
      >
        Create Deck
      </button>
      {decks.map((deck) => (
        <Card
          key={deck.id}
          deckId={deck.id}
          title={deck.name}
          description={deck.description}
          cardCount={deck.cards ? deck.cards.length : 0}
          onDelete={() => setDecks(decks.filter(d => d.id !== deck.id))} 
        />
      ))}
    </div>
  );
};

export default Decks;