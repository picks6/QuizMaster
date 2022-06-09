import React, { useState } from 'react';

import { Header, Button, Card} from 'semantic-ui-react';

const CreateCardHeader = ({ deck }) => (
  <>
    <Header as='h1'>
      {deck.title}
    </Header>
    <Header as='h2'>
      Category: {deck.categories.map(category => category.category)}
    </Header>
  </>
)
const CreateCard = ({ deck, handleClick, cardState, children }) => (
  <>
    <CreateCardHeader deck={deck}/>
    <Card.Group>
      {
        deck.cards.length ? (
          deck.cards.map(card =>
            <Card id={card._id}>
              <Card.Content>
                {card.sideA}
              </Card.Content>
              <Card.Content>
                {card.sideB}
              </Card.Content>
            </Card>
          )
        ) : (
          <></>
        )
      }
      {
        cardState.editing == true ? (
          <Card>
            <Card.Content>
              {children}
            </Card.Content>
          </Card>
        ) : (
          <></>
        )
      }
      <Card>
        <Card.Content>
          <Button basic color='white' onClick={handleClick}>✖️</Button>
        </Card.Content>
      </Card>
    </Card.Group>  
  </>
);
export default CreateCard;