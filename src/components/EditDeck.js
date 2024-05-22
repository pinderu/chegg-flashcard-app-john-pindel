import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index'; 

const EditDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    readDeck(deckId, controller.signal)
      .then(setDeck)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDeck(deck);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error('Failed to update deck:', error);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={deck.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={deck.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/decks/${deckId}`)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default EditDeck;