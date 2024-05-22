import React from 'react';
import { useNavigate } from 'react-router-dom';
import './card.css';
import { deleteDeck } from '../utils/api/index'; 

const Card = ({ deckId, title, description, cardCount, onDelete }) => {
    const navigate = useNavigate();
  
    const handleDelete = async () => {
      if (window.confirm("Are you sure you want to delete this deck? This action cannot be undone.")) {
        try {
          await deleteDeck(deckId);
          onDelete(); 
        } catch (error) {
          console.error("Failed to delete the deck:", error);
        }
      }
    };
  
    const handleStudy = () => {
        navigate(`/decks/${deckId}/study`);
    };

    const handleView = () =>{
        navigate(`/decks/${deckId}`);
    }
  
    return (
      <div className="card">
        <div className="card-header">
          <h2>{title}</h2>
          <span>{cardCount} cards</span>
        </div>
        <div className="card-body">
          <p>{description}</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-view" onClick={handleView}>View</button>
          <button className="btn btn-study" onClick={handleStudy}>Study</button>
          <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    );
  };
  
  export default Card;