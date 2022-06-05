import React, {useState} from 'react';

import CardFlip from '../quizmaster/CardFlip';

import { useQuery } from '@apollo/client';
import { QUERY_DECK } from '../../utils/queries';

const Deck = () => { 
  // Deck ID needs to be passed to component for query to function

  const { loading, error, data } = useQuery(QUERY_DECK, {
    variables: {}
  });
  console.log('GET_CARDS:', data);
  const cards = data.cards

  if (loading) return <div>Loading</div>; 
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {cards.map((el) => <CardFlip sideA={el.sideA} sideB={el.sideB} />)}
    </div>
  )
}

export default Deck;