import React, { useState } from 'react';

import { Button, Card} from 'semantic-ui-react';

const CreateCard = ({ deck, handleClick, cardState, children }) => (
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
);
export default CreateCard;