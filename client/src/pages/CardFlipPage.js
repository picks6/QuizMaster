import React, { useState } from "react";
import Slider from "react-touch-drag-slider";
import { useLocation, useParams } from "react-router-dom";
import styled, { createGlobalStyle, css } from "styled-components";

import CardFlip from "../components/quizmaster/CardFlip";
import { useQuery } from "@apollo/client";
import { QUERY_CARD, QUERY_DECK } from "../utils/queries";
import FlipWrapper from "../components/ui/FlipWrapper";

// define some basic styles
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,body {
    padding: 0;
    margin: 0;
  }
`;
// The slider will fit any size container, lets go full screen...
const AppStyles = styled.main`
  height: 100vh;
  width: 100vw;
`;

const Button = styled.button`
  font-size: 2rem;
  z-index: 10;
  position: fixed;
  top: 50%;
  ${(props) =>
    props.right
      ? css`
          right: 0.5rem;
        `
      : css`
          left: 0.5rem;
        `}
`;

function CardFlipPage() {
  // const location = useLocation();
  // console.log("location:", location);
  // const deck = location.state;
  const params = useParams();

  const [index, setIndex] = useState(0);
  // const { loading, error, data } = useQuery(QUERY_CARD, {
  // 	// variables: { deckId, cardId },
  // 	variables: {
  // 		deckId: '629fe32a513cfd52ed0f2d3f',
  // 		cardId: '629fe32a513cfd52ed0f2d48',
  // 	},
  // }); // returns single card
  const { loading, error, data } = useQuery(QUERY_DECK, {
    variables: { deckId: params.id },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error! {`${error.message}`}</div>;
  // console.log('data', data);
  // const card = data.card.cards;
  // console.log('QUERY_CARD:', data.deck.cards);
  // console.log('params:', params);
  const card = data.deck.cards;

  const setFinishedIndex = (i) => {
    console.log("finished dragging on slide", i);
    setIndex(i);
  };
  const next = () => {
    if (index < card.length - 1) setIndex(index + 1);
  };
  const previous = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <>
      <GlobalStyles />
      <AppStyles>
        <FlipWrapper>
          <Button onClick={previous} left disabled={index === 0}>
            〈
          </Button>
          <Button onClick={next} right disabled={index === card.length - 1}>
            〉
          </Button>
          <Slider
            onSlideComplete={setFinishedIndex}
            onSlideStart={(i) => {
              console.clear();
              console.log("started dragging on slide", i);
            }}
            activeIndex={index}
            threshHold={100}
            transition={0.5}
            // scaleOnDrag={true}
          >
            {card.map((card, index) => (
              <CardFlip card={card} key={index} />
            ))}
          </Slider>
        </FlipWrapper>
      </AppStyles>
    </>
  );
}

export default CardFlipPage;
