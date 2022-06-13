import React, {useState} from 'react';
import { Card, Button, Header, Form, Modal, Icon } from 'semantic-ui-react';
// import CardFlip from '../quizmaster/CardFlip';

import { Action, EditDeck, EditCard, Delete } from './Actions';
import { CreateDeck } from './CreateDeck';
import DeckForm from './DeckForm';
import Category from '../ui/Category';

// import { useQuery } from '@apollo/client';
// import { GET_DECKS, QUERY_DECK } from '../../utils/queries';

const Deck = ({ 
  deck, 
  handleDeckFormChange, 
  handleDeckFormSubmit,
  handleCardFormChange,
  handleCardFormSubmit
}) => {
  // const { loading, error, data } = useQuery(GET_DECKS);
  // console.log('GET_DECKS:', data);
  // const cards = data.cards
  // if (loading) return <div>Loading</div>; 
  // if (error) return `Error! ${error.message}`;
  const [categories, setCategories] = useState(deck.categories);
  console.log('deck:', deck);

  return (
    <>
      <Card>
        <Card.Content>
          {deck.title} 
          <EditDeck
            state={deck}
            handleChange={handleDeckFormChange}
            handleSubmit={handleDeckFormSubmit}
          />
          <Delete 
            header={'Are you sure you want to delete this Deck?'}
          />
        </Card.Content>
        <Card.Content>created by: {deck.creator.username}</Card.Content>
        <Card.Content>categories: {deck.categories.map((category) => `${category.category} `)}</Card.Content>
      </Card>
      {
        deck.cards.map(
          (card) => (
            <Card key={card._id}>
              <Card.Content>

                <EditCard 
                  state={card}
                  handleChange={handleCardFormChange}
                  handleSubmit={handleCardFormSubmit}
                  // handleCancel={}
                />
                <Delete 
                  header={'Delete this card?'}
                />
              </Card.Content>
              <Card.Content>
                <p>SideA: {card.sideA}</p>
                <p>SideB: {card.sideB}</p>
              </Card.Content>
            </Card>
          )
        )
      }
    </>
  )
}

export default Deck;