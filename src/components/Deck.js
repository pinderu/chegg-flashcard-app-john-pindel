import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from '../utils/api/index'; 

const Deck = () => {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const controller = new AbortController();
      readDeck(deckId, controller.signal)
        .then(setDeck)
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        });
  
      return () => controller.abort();
    }, [deckId]);
  
    const handleDeleteDeck = async () => {
      if (window.confirm("Are you sure you want to delete this deck? This action cannot be undone.")) {
        try {
          await deleteDeck(deckId);
          navigate('/');
        } catch (error) {
          console.error("Failed to delete the deck:", error);
        }
      }
    };
  
    const handleDeleteCard = async (cardId) => {
      if (window.confirm("Are you sure you want to delete this card? This action cannot be undone.")) {
        try {
          await deleteCard(cardId);
          setDeck((prevDeck) => ({
            ...prevDeck,
            cards: prevDeck.cards.filter(card => card.id !== cardId),
          }));
        } catch (error) {
          console.error("Failed to delete the card:", error);
        }
      }
    };
  
    if (!deck) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div>
          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
          <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
          <button className="btn btn-danger" onClick={handleDeleteDeck}>Delete</button>
        </div>
        <h3>Cards</h3>
        {!deck.cards || deck.cards.length === 0 ? (
          <p>No cards in this deck.</p>
        ) : (
          <div>
            {deck.cards.map((card) => (
              <div key={card.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Question</h5>
                  <p className="card-text">{card.front}</p>
                  <h5 className="card-title">Answer</h5>
                  <p className="card-text">{card.back}</p>
                  <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                  <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Deck;