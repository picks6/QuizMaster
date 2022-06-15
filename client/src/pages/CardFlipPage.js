import React, { useState, useEffect } from "react";
import Slider from "react-touch-drag-slider";
import { useStoreContext } from "../utils/GlobalState";
import { useParams } from "react-router-dom";
import styled, { createGlobalStyle, css } from "styled-components";

import CardFlip from "../components/quizmaster/CardFlip";
import { useQuery } from "@apollo/client";
import { QUERY_DECK } from "../utils/queries";
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
  const [state] = useStoreContext();
  const params = useParams();
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState("");

  const { loading, error, data } = useQuery(QUERY_DECK, {
    variables: { deckId: params.id },
  });
  useEffect(() => {
    const setState = async () => {
      if (data) {
        console.log(data);
        const cards =
          data.deck.price && !state.permissions.includes(data.deck._id)
            ? data.deck.cards
                .map((card) => {
                  return { ...card, sideB: "PAYWALL" };
                })
                .splice(0, 3)
            : data.deck.cards;
        setCards(cards);
        console.log(cards);
      }
    };
    setState();
  }, [data]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error! {`${error.message}`}</div>;

  const setFinishedIndex = (i) => {
    setIndex(i);
  };
  const next = () => {
    if (index < cards.length - 1) setIndex(index + 1);
  };
  const previous = () => {
    if (index > 0) setIndex(index - 1);
  };

  return !cards.length ? (
    <div>Loading</div>
  ) : (
    <>
      <GlobalStyles />
      <AppStyles>
        <FlipWrapper>
          <Button onClick={previous} left disabled={index === 0}>
            〈
          </Button>
          <Button onClick={next} right disabled={index === cards.length - 1}>
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
          >
            {cards.map((card, index) => (
              <CardFlip card={card} key={index} />
            ))}
          </Slider>
        </FlipWrapper>
      </AppStyles>
    </>
  );
}

export default CardFlipPage;
