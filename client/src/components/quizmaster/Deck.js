import React, {useState} from 'react';
import { Card, Button } from 'semantic-ui-react';
// import CardFlip from '../quizmaster/CardFlip';

import CardFlip from '../quizmaster/CardFlip';

import { useQuery } from '@apollo/client';
import { GET_DECKS, QUERY_DECK } from '../../utils/queries';

const Deck = () => {
  const { loading, error, data } = useQuery(GET_DECKS);
  console.log('GET_DECKS:', data);
  const cards = data.cards
  if (loading) return <div>Loading</div>; 
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {/* {cards.map((el) => <CardFlip sideA={el.sideA} sideB={el.sideB} />)} */}
    </div>
  )
}

export default Deck;