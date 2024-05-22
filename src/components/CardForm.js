import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { readDeck, readCard, createCard, updateCard } from '../utils/api/index';

const CardForm = () => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: '', back: '' });
  const navigate = useNavigate();
  const isEdit = Boolean(cardId);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDeckAndCard() {
      try {
        const deck = await readDeck(deckId, controller.signal);
        setDeck(deck);
        if (isEdit) {
          const card = await readCard(cardId, controller.signal);
          setCard(card);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      }
    }

    loadDeckAndCard();

    return () => controller.abort();
  }, [deckId, cardId, isEdit]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEdit) {
        await updateCard(card);
      } else {
        await createCard(deckId, card);
        setCard({ front: '', back: '' }); 
      }
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error('Failed to save card:', error);
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
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{isEdit ? `Edit Card ${cardId}` : 'Add Card'}</li>
        </ol>
      </nav>
      <h2>{deck.name}: {isEdit ? `Edit Card` : 'Add Card'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={card.front}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={card.back}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/decks/${deckId}`)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default CardForm;