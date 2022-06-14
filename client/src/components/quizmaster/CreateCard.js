import React, { useState } from "react";
import { Header, Button, Card } from "semantic-ui-react";

import { EditDeck, EditCard, Delete } from "./Actions";

export const CreateCardHeader = ({ deck, state, handleChange, handleSubmit, handleCancel, handleDelete }) => (
  <Card>
    <Card.Content>
      <Card.Header>
        <Header as="h1">{deck.title}</Header>
        <EditDeck
          state={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
        <Delete 
          action={'REMOVE_DECK'}
          stateId={deck._id}
          header={'Are you sure you want to delete this Deck?'}
          handleDelete={handleDelete}
        />
      </Card.Header>
      <Header as="h2">
        Category: {deck.categories.map((category) => category.category)}
      </Header>
      <Header as="h3">{deck.creator.username}</Header>
      <p>{deck.description}</p>
      {deck.price ? <Header>{`$${deck.price}`}</Header> : <></>}
    </Card.Content>
  </Card>
);
export const CreateCard = ({ deck, handleChange, handleSubmit, handleClick, handleDelete, cardState, children }) => (
  <>
    <Card.Group>
      {deck.cards.length ? (
        deck.cards.map((card) => (
          <Card key={card._id}>
            <Card.Content>
              <EditCard 
                state={cardState}
                card={card}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
              <Delete 
                action={'REMOVE_CARD'}
                stateId={card._id}
                header={'Delete this card?'}
                handleDelete={handleDelete}
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
