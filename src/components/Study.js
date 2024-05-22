import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { readDeck } from '../utils/api/index'; 

const Study = () => {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
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
  
    if (!deck) {
      return <p>Loading...</p>;
    }
  
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };
  
    const handleNext = () => {
      if (currentCardIndex + 1 < deck.cards.length) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      } else {
        if (window.confirm("Restart deck? Click 'cancel' to return to the home page.")) {
          setCurrentCardIndex(0);
          setIsFlipped(false);
        } else {
          navigate("/");
        }
      }
    };
  
    if (!deck.cards || deck.cards.length < 3) {
      return (
        <div>
          <h1>{deck.name}</h1>
          <h2>Not enough cards</h2>
          <p>You need at least 3 cards to study. There are {deck.cards ? deck.cards.length : 0} cards in this deck.</p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      );
    }
  
    const currentCard = deck.cards[currentCardIndex];
  
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
        <h2>Study: {deck.name}</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Card {currentCardIndex + 1} of {deck.cards.length}</h5>
            <p className="card-text">{isFlipped ? currentCard.back : currentCard.front}</p>
            <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
            {isFlipped && <button className="btn btn-primary" onClick={handleNext}>Next</button>}
          </div>
        </div>
      </div>
    );
  };
  
  export default Study;