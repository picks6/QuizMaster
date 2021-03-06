import "../../index.css";
import React from "react";
import { Card, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import classes from "./Landing.module.css";

import { idbPromise } from "../../utils/helpers";
import Auth from "../../utils/auth";
import CardWrapper from "../../components/ui/CardWrapper";
const slugify = require("slugify");

const Landing = ({ decks }) => {
  const [state] = useStoreContext();

  const handleCheckout = async ({ deck }) => {
    await idbPromise("cart", "put", deck);
  };
  const DeckLink = ({ deck, children }) => (
    <Button
      color="teal"
      className={classes.deck__button}
      as={Link}
      to={`/deck/${slugify(deck.title)}/${deck._id}`}
      state={deck}
    >
      {children}
    </Button>
  );
  const CheckoutLink = (deck) => {
    const url = Auth.isLoggedIn() ? "/checkout" : "/signup";
    return (
      <Button
        color="blue"
        animated
        as={Link}
        to={url}
        // state={deck}
        onClick={() => handleCheckout(deck)}
      >
        <Button.Content visible>Buy</Button.Content>
        <Button.Content hidden>Price</Button.Content>
      </Button>
    );
  };
  const PaywallButtons = ({ deck }) => (
    <Button.Group>
      <DeckLink deck={deck}>preview deck</DeckLink>
      <Button.Or />
      <CheckoutLink deck={deck} />
    </Button.Group>
  );
  const DeckPreview = ({ deck }) => (
    <>
      <Card.Content>
        <Header as={"h1"}>{deck.title}</Header>
        <Header as={"h2"}>By: {deck.creator.username}</Header>
        {deck.price ? <p>{`$${deck.price}`}</p> : <></>}
        <p>{deck.categories.map((category) => `${category.category} `)}</p>
        <p>{deck.description}</p>
      </Card.Content>
    </>
  );

  return (
    <CardWrapper>
      <Card.Group id="searchResults">
        {decks.length ? (
          decks.map((deck) => (
            <Card color="blue" key={deck._id}>
              <DeckPreview deck={deck} />
              {deck.price && !state.permissions.includes(deck._id) ? (
                <PaywallButtons deck={deck} />
              ) : (
                <DeckLink deck={deck}>View Deck</DeckLink>
              )}
            </Card>
          ))
        ) : (
          <></>
        )}
      </Card.Group>
    </CardWrapper>
  );
};
export default Landing;
