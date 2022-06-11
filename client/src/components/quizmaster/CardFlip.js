import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
// import Slider from 'react-touch-drag-slider'
import { Card, Button, Header, Grid } from "semantic-ui-react";

const CardFlip = ({card}) => {
  
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  // return (
  //   <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
  //     <Grid.Column style={{ maxWidth: 450 }}>
  //       <Header as="h2" color="teal" textAlign="center">
  //         deckTitle
  //       </Header>
  //       <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
  //         <Card>
  //           <Card.Content>{card.sideA}</Card.Content>
  //           <Button color="teal" onClick={handleClick}>
  //             Click to flip
  //           </Button>
  //         </Card>

  //         <Card>
  //           <Card.Content>{card.sideB}</Card.Content>
  //           <Button color="teal" onClick={handleClick}>
  //             Click to flip
  //           </Button>
  //         </Card>
  //       </ReactCardFlip>
  //     </Grid.Column>
  //   </Grid>
    
  // );
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Card>
        <Card.Content>{card.sideA}</Card.Content>
        <Button color="teal" onClick={handleClick}>
          Click to flip
        </Button>
      </Card>
      <Card>
        <Card.Content>{card.sideB}</Card.Content>
        <Button color="teal" onClick={handleClick}>
          Click to flip
        </Button>
      </Card>
    </ReactCardFlip>
  )
};

export default CardFlip;


