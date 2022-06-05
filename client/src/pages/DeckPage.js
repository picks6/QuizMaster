import Deck from "../components/quizmaster/Deck";

import { useQuery } from '@apollo/client';
import { QUERY_DECK } from '../utils/queries';

function DeckPage({ deckId }) { // expect deckId to be passed as a prop

  const { loading, error, data } = useQuery(QUERY_DECK, {
    // variables: { deckId }
    variables: { deckId: ""} // for testing
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error! {`${error.message}`}</div>;

  console.log('QUERY_DECK:', data.deck);
  const deck = data.deck

  return (
    <section>
      <Deck deck={deck} />
    </section>
  );
}

export default DeckPage;
