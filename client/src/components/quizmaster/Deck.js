import React, {useState} from 'react';

import CardFlip from '../Card/CardFlip';

import { useQuery } from '@apollo/client';
import { GET_CARDS, QUERY_CARD } from '../../utils/queries';

const Deck = () => {
  const { loading, error, data } = useQuery(GET_CARDS);
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