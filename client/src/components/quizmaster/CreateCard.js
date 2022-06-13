import React, { useState } from "react";
import { Header, Button, Card } from "semantic-ui-react";

import { EditDeck, EditCard, Delete } from "./Actions";

export const CreateCardHeader = ({ deck, handleChange, handleSubmit, handleCancel }) => (
  <Card>
    <Card.Content>
      <EditDeck
        state={deck}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
      <Delete 
        header={'Are you sure you want to delete this Deck?'}
      />
    </Card.Content>
    <Card.Content>
      <Header as="h1">{deck.title}</Header>
      <Header as="h2">
        Category: {deck.categories.map((category) => category.category)}
      </Header>
    </Card.Content>
  </Card>
);
export const CreateCard = ({ deck, handleChange, handleSubmit, handleClick, handleCancel, cardState, children }) => (
  <>
    <Card.Group>
      {deck.cards.length ? (
        deck.cards.map((card) => (
          <Card id={card._id}>
            <Card.Content>
              <EditCard 
                state={deck}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
              />
              <Delete 
                header={'Delete this card?'}
              />
            </Card.Content>
            <Card.Content>
              <p>{card.sideA}</p>
              <p>{card.sideB}</p>
              </Card.Content>
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
