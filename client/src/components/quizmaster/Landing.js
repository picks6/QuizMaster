import React, { useState } from "react";
import { Card, Form, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";

import Cart from "../cart/Cart";
import { idbPromise } from "../../utils/helpers";
import Auth from "../../utils/auth";
import CardWrapper from "../../components/ui/CardWrapper";
const slugify = require("slugify");

const Landing = ({ decks }) => {
  const [state, dispatch] = useStoreContext();

  const handleCheckout = async ({deck}) => {
    console.log('deck:', deck);
    const cart = await idbPromise('cart', 'put', deck);
    console.log('cart:', cart);
  }
  const DeckLink = ({deck, children}) => (
    <Button 
      as={Link} 
      to={`/deck/${slugify(deck.title)}/${deck._id}`} 
      state={deck}
    >
      {children}
    </Button>
  );
  const CheckoutLink = (deck) => {
    const url = Auth.isLoggedIn ? "/checkout" : "/signup";
    return (
      <Button
        animated
        as={Link}
        to={url}
        // state={deck}
        onClick={()=>handleCheckout(deck)}
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
        <Header as={'h1'}>{deck.title}</Header>
        <Header as={'h2'}>By: {deck.creator.username}</Header>
        {deck.price ? <p>{`$${deck.price}`}</p> : <></>}
        <p>{deck.categories.map((category) => `${category.category} `)}</p>
        <p>{deck.description}</p>
      </Card.Content>
    </>
  );

  return (
    <CardWrapper>
      <Card.Group>
        {decks.length ? (
          decks.map((deck) => (
            <Card color="blue" key={deck._id}>
              <DeckPreview deck={deck} />
              {
                deck.price && !state.permissions.includes(deck._id) ? (
                  <PaywallButtons deck={deck} />
                ) : (
                  <DeckLink deck={deck}>
                    View Deck
                  </DeckLink>
                )
              }
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
