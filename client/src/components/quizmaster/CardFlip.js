import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
// import Slider from 'react-touch-drag-slider'
import { Card, Button, Image, Header, Grid } from "semantic-ui-react";
import classes from "./CardFlip.module.css";

import "../../index.css";

const CardFlip = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Card className={classes.card__flip}>
        <div style={{ width: "30rem" }}>
          <Card.Content>{card.sideA}</Card.Content>
        </div>
        <div className={classes.flip__btn}>
          <Button color="teal" onClick={handleClick}>
            Click to flip
          </Button>
        </div>
      </Card>
      <Card>
        <div style={{ width: "30rem" }}>
          <Card.Content>
            {card.sideB == "PAYWALL" ? (
              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                fluid
              />
            ) : (
              card.sideB
            )}
          </Card.Content>
        </div>
        <div className={classes.flip__btn}>
          <Button color="teal" onClick={handleClick}>
            Click to flip
          </Button>
        </div>
      </Card>
    </ReactCardFlip>
  );
};

export default CardFlip;
