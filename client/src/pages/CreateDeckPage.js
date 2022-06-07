import React, { useState } from 'react';

import CreateDeck from "../components/quizmaster/CreateDeck";
import CreateCard from '../components/quizmaster/CreateCard';
import CardForm from '../components/quizmaster/CardForm';

import { useMutation } from '@apollo/client';
import { ADD_DECK, ADD_CARD } from '../utils/mutations';

function CreateDeckPage() {
  const [deckformState, setDeckFormState] = useState(
    { title: '', category: '', description: '' }
  );
  const [deck, setDeck] = useState('');
  const [addDeck, {}] = useMutation(ADD_DECK);

  const [cardState, setCardState] = useState({ editing: false });
  const [addCard, {}] = useMutation(ADD_CARD);

  const [cardFormState, setCardFormState] = useState(
    { sideA: '', sideB: '' }
  );

  const handleDeckFormChange = (event) => {
    const { name, value } = event.target;
    setDeckFormState({ ...deckformState, [name]: value });
  };
  const handleDeckFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addDeck({variables: { ...deckformState }});
      const newDeck = data.addDeck;
      console.log('ADD_DECK:', newDeck);
      setDeck(newDeck);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClick = async (event) => {
    setCardState({ editing: true })
  }
  
  const handleCardFormChange = async (event) => {
    const { name, value } = event.target;
    setCardFormState({ ...cardFormState, [name]: value});
  };
  const handleCardFormSubmit = async (event) => {
    event.preventDefault();
    console.log({ ...cardFormState, deckId: deck._id });
    try {
      const { data } = await addCard(
        { variables: { ...cardFormState, deckId: deck._id } }
      );
      const newDeck = data.addCard;
      console.log('ADD_CARD', newDeck);
      setDeck(newDeck)
      setCardState({ editing: false });
      setCardFormState('');
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = (event) => {
    event.preventDefault();
    console.log('test');
    setCardState({ editing: false });
    setCardFormState('');
  }
  
  if (deck === '') {
    return (
      <CreateDeck 
        handleChange={handleDeckFormChange} 
        handleFormSubmit={handleDeckFormSubmit} 
        formState={deckformState}
      />
    );
  } else {
    return (
      <CreateCard  
        deck={deck} 
        handleClick={handleClick} 
        cardState={cardState}
      >
        <CardForm 
          handleFormSubmit={handleCardFormSubmit}
          handleChange={handleCardFormChange}
          cardFormState={cardFormState}
          handleCancel={handleCancel}
        />
      </CreateCard>
    )
  }
}

export default CreateDeckPage;
