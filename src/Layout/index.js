import React from "react";
import Header from "./Header";
import {  Routes, Route } from 'react-router-dom';
import NotFound from "./NotFound";
import Decks from "../components/Decks"
import Study from "../components/Study"
import CreateDeck from "../components/CreateDeck";
import Deck from '../components/Deck'; 
import EditDeck from "../components/EditDeck";
import CardForm from "../components/CardForm";

function Layout() {
  return (
    <>
    
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <h1>Flashcards</h1>
        <Routes>
          <Route path="/" element={<Decks />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />}/>
          <Route path="/decks/:deckId" element={<Deck />} />
          <Route path="/decks/:deckId/cards/new" element={<CardForm />} /> 
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<CardForm />} /> 
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
    </>
  );
}

export default Layout;
