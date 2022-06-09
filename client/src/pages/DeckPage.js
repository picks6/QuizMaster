import Deck from "../components/quizmaster/Deck";
import { useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_DECKS } from '../utils/queries';

function DeckPage({ deckId }) { // expect deckId to be passed as a prop
  const location = useLocation();
  console.log('location:', location);
  const { from } = location.state;

  // console.log('from:', from);
  // const { loading, error, data } = useQuery(GET_DECKS, 
  //   {
  //   // variables: { deckId }
  //   variables: { deckId: ""} // for testing
  // }
  // );
  // if (loading) return <div>Loading</div>;
  // if (error) return <div>Error! {`${error.message}`}</div>;

  console.log('QUERY_DECK:', data.decks);
  const deck = data.decks

  return (
    <section>
      <Deck deck={deck} />
    </section>
  );
}

export default DeckPage;
