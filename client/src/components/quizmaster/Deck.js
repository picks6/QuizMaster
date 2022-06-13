import React, {useState} from 'react';
import { Card, Button, Header, Form, Modal, Icon } from 'semantic-ui-react';
// import CardFlip from '../quizmaster/CardFlip';

import { Action } from './Action';
import { CreateDeck } from './CreateDeck';
import DeckForm from './DeckForm';
import Category from '../ui/Category';

// import { useQuery } from '@apollo/client';
// import { GET_DECKS, QUERY_DECK } from '../../utils/queries';

const Deck = ( { deck, handleChange, handleSubmit } ) => {
  // const { loading, error, data } = useQuery(GET_DECKS);
  // console.log('GET_DECKS:', data);
  // const cards = data.cards
  // if (loading) return <div>Loading</div>; 
  // if (error) return `Error! ${error.message}`;
  const [editingDeck, setEditingDeck] = useState(false);
  const [confirmDeleteDeck, setConfirmDeleteDeck] = useState(false);
  const [editingCard, setEditingCard] = useState(false);
  const [confirmDeleteCard, setConfirmDeleteCard] = useState(false);
  const [categories, setCategories] = useState(deck.categories);
  console.log('deck:', deck);

  return (
    <>
      <Card>
        <Card.Content>
          {deck.title} 
          <Action 
            state={editingDeck} 
            setState={setEditingDeck} 
            name={'edit'} 
            header={'Edit Deck Information:'}
          >
            <CreateDeck 
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              state={deck}
              // styles={styles}
            >
              <Category
                placeholder={"Add a Category"}
                handleChange={handleChange}
                categoryState={deck.categories}
              />
            </CreateDeck>
          </Action>
          <Action 
            state={confirmDeleteDeck} 
            setState={setConfirmDeleteDeck} 
            name={'trash alternate'} 
            header={'Are you sure you want to delete this Deck?'}
          ></Action>
        </Card.Content>
        <Card.Content>created by: {deck.creator.username}</Card.Content>
        <Card.Content>categories: {deck.categories.map((category) => `${category.category} `)}</Card.Content>
      </Card>
      {
        deck.cards.map(
          (card) => (
            <Card key={card._id}>
              <Card.Content>
              <Action 
                state={editingCard} 
                setState={setEditingCard} 
                name={'edit'} 
                header={'Edit Card:'}
              ></Action>
              <Action 
                state={confirmDeleteCard} 
                setState={setConfirmDeleteCard} 
                name={'trash alternate'} 
                header={'Delete this card?'}
              ></Action>
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