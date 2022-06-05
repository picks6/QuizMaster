import CardFlip from "../components/quizmaster/CardFlip";

import { useQuery } from "@apollo/client";
import { QUERY_CARD } from "../utils/queries";

function CardFlipPage(props) {
  // Card ID and Deck ID must be passed.
  const { loading, error, data } = useQuery(QUERY_CARD, {
    variables: { deckId: props.deckId, cardId: props.cardId },
    // variables: { deckId: "", cardId: "" } // for testing
  }); // returns single card
  // Expect data: {
  //   card: {
  //     cards: [{ sideA, sideB, deck }]
  //   }
  // }
  const card = data.card.cards[0];

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error! {`${error.message}`}</div>;

  return (
    <section>
      <CardFlip card={card} />
    </section>
  );
}

export default CardFlipPage;
