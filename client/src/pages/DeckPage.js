import Deck from "../components/quizmaster/Deck";
import { useLocation } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { GET_DECKS, QUERY_DECK } from '../utils/queries';

function DeckPage() { // expect deckId to be passed as a prop
  const location = useLocation();
  console.log('location:', location);
  const deck = location.state;

  // console.log('from:', from);
  // const { loading, error, data } = useQuery(GET_DECKS, 
  //   {
  //   // variables: { deckId }
  //   variables: { deckId: ""} // for testing
  // }
  // );
  // if (loading) return <div>Loading</div>;
  // if (error) return <div>Error! {`${error.message}`}</div>;

  console.log('DECK:', deck);
  // const deck = data.decks

  return (
    <section>
      <Deck deck={deck} />
    </section>
  );
}

export default DeckPage;
