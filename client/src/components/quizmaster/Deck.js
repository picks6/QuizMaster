import React, {useState} from 'react';
import { Card, Button, Header } from 'semantic-ui-react';
// import CardFlip from '../quizmaster/CardFlip';

import CardFlip from '../quizmaster/CardFlip';

// import { useQuery } from '@apollo/client';
// import { GET_DECKS, QUERY_DECK } from '../../utils/queries';

const Deck = ( { deck } ) => {
  // const { loading, error, data } = useQuery(GET_DECKS);
  // console.log('GET_DECKS:', data);
  // const cards = data.cards
  // if (loading) return <div>Loading</div>; 
  // if (error) return `Error! ${error.message}`;
  console.log('deck:', deck);
  return (
    <>
      <Card>
        <Card.Content>{deck.title}</Card.Content>
        <Card.Content>created by: {deck.creator.username}</Card.Content>
        <Card.Content>categories: {deck.categories.map((category) => `${category.category} `)}</Card.Content>
        <Button>Edit</Button>
      </Card>
      {
        deck.cards.map(
          (card) => (
            <Card key={card._id}>
              <Card.Content>{card.sideA}</Card.Content>
              <Card.Content>{card.sideB}</Card.Content>
              <Button>Edit</Button>
            </Card>
          )
          // <CardFlip sideA={el.sideA} sideB={el.sideB} />
        )
      }
    </>
  )
}

export default Deck;