import React, { useState } from "react";
import { Header, Button, Card } from "semantic-ui-react";

import { Action } from "./Action";

export const CreateCardHeader = ({ deck }) => (
  <Card>
    <Header as="h1">{deck.title}</Header>
    <Header as="h2">
      Category: {deck.categories.map((category) => category.category)}
    </Header>
    <Button>Edit Deck information</Button>
  </Card>
);
export const CreateCard = ({ deck, handleClick, cardState, children }) => (
  <>
    <Card.Group>
      {deck.cards.length ? (
        deck.cards.map((card) => (
          <Card id={card._id}>
            <Card.Content>{card.sideA}</Card.Content>
            <Card.Content>{card.sideB}</Card.Content>
          </Card>
        ))
      ) : (
        <></>
      )}
      {cardState.editing == true ? (
        <Card>
          <Card.Content>{children}</Card.Content>
        </Card>
      ) : (
        <></>
      )}
      <Card>
        <Card.Content>
          <Button basic color="white" onClick={handleClick}>
            +
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  </>
);
