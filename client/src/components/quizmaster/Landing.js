import React, { useState } from 'react';
import { Card, Form, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';

import CardWrapper from "../../components/ui/CardWrapper";
const slugify = require("slugify");

const Landing = ({decks}) => {
  const [state, dispatch] = useStoreContext();

  const LinkButton = ({deck, children}) => (
    <Button 
      as={Link} 
      to={`/deck/${slugify(deck.title)}/${deck._id}`} 
      state={deck}
    >{children}</Button>
  );
  const PaywallButtons = ({deck}) => (
    <Button.Group>
      <LinkButton deck={deck}>preview deck</LinkButton>
      <Button.Or />
      <Button animated>
        {/* TODO: CONNECT TO CART TO BE RENDERED AS A MODAL */}
        <Button.Content visible>Buy</Button.Content>
        <Button.Content hidden>Price</Button.Content>
      </Button>
    </Button.Group>
  );
  const DeckPreview = ({deck}) => (
    <>
      <Card.Content>{deck.title}</Card.Content>
      <Card.Content>{deck.description}</Card.Content>
      <Card.Content>
        {deck.categories.map((category) => `${category.category} `)}
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
                deck.price 
                  ? <PaywallButtons deck={deck} />
                  : <LinkButton deck={deck}>if Deck.Price, render Deck.Price</LinkButton>
              }
            </Card>
          ))
        ) : (
          <></>
        )}
      </Card.Group>
    </CardWrapper>
  )
};
export default Landing;