import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Card, Button, Header, Grid } from "semantic-ui-react";

import { useQuery } from "@apollo/client";
import { QUERY_CARD } from '../../utils/queries';

const CardFlip = () => {
  const { loading, error, data } = useQuery(QUERY_CARD, {
    variables: { cardId: "629a4823d329d4ec1515c3b6" },
  });
  console.log(data);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  if (loading) return <div>Loading</div>;
  if (error) return `Error! ${error.message}`;
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          deckTitle
        </Header>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <Card>
            <Card.Content>{data.card.sideA}</Card.Content>
            <Button color="teal" onClick={handleClick}>
              Click to flip
            </Button>
          </Card>

          <Card>
            <Card.Content>{data.card.sideB}</Card.Content>
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
