import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
// import Slider from 'react-touch-drag-slider'
import { Card, Button, Image, Header, Grid } from "semantic-ui-react";

const CardFlip = ({card}) => {
  
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Card>
        <Card.Content>{card.sideA}</Card.Content>
        <Button color="teal" onClick={handleClick}>
          Click to flip
        </Button>
      </Card>
      <Card>
        <Card.Content>
          {
            (card.sideB == "PAYWALL") 
            ? <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' fluid />
            : card.sideB
          }
        </Card.Content>
        <Button color="teal" onClick={handleClick}>
          Click to flip
        </Button>
      </Card>
    </ReactCardFlip>
  )
};

export default CardFlip;


