import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Card, Button, Header, Grid } from "semantic-ui-react";

const CardFlip = (props) => {
  
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          deckTitle
        </Header>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <Card>
            <Card.Content>{props.card.sideA}</Card.Content>
            <Button color="teal" onClick={handleClick}>
              Click to flip
            </Button>
          </Card>

          <Card>
            <Card.Content>{props.card.sideB}</Card.Content>
            <Button color="teal" onClick={handleClick}>
              Click to flip
            </Button>
          </Card>
        </ReactCardFlip>
      </Grid.Column>
    </Grid>
  );
};

export default CardFlip;
