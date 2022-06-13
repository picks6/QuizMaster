import React, {useState} from 'react';
import { Card, Button, Header, Form, Modal, Icon } from 'semantic-ui-react';
// import CardFlip from '../quizmaster/CardFlip';

import { Action, EditDeck, EditCard, Delete } from './Actions';
import { CreateCardHeader } from './CreateCard';
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
      <CreateCardHeader 
        deck={deck}
      />
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