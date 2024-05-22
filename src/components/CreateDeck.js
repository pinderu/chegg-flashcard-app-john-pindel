import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createDeck } from '../utils/api/index'; 
const CreateDeck = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = { name, description };
    try {
      const savedDeck = await createDeck(newDeck);
      navigate(`/decks/${savedDeck.id}`);
    } catch (error) {
      console.error('Failed to create deck:', error);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Deck Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the deck"
            required
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateDeck;