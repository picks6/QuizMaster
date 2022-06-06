import CardFlip from "../components/quizmaster/CardFlip";

import { useQuery } from "@apollo/client";
import { QUERY_CARD } from "../utils/queries";

function CardFlipPage({ deckId, cardId }) {
  // Card ID and Deck ID must be passed.
  const { loading, error, data } = useQuery(QUERY_CARD, {
    // variables: { deckId, cardId },
    variables: { deckId: "629c07565cac8a2aa7e11d62", cardId: "629ce302d7482b2bc771c9f1" } // for testing
  }); // returns single card
  // Expect data: {
  //   card: {
  //     cards: [{ sideA, sideB, deck }]
  //   }
  // }

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error! {`${error.message}`}</div>;
  
  const card = data.card.cards[0];
  console.log("QUERY_CARD:", card);

  return (
    <section>
      <CardFlip card={card} />
    </section>
  );
}

export default CardFlipPage;
