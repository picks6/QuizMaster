import React, { useState } from "react";

import { Form, Button, Checkbox, Label } from "semantic-ui-react";

import classes from "./CreateDeck.module.css";

import "../../index.css";

function CreateDeck({ handleChange, handleFormSubmit, formState, children }) {
  const [paywall, setPaywall] = useState(true);
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Field>
        <div className="ui teal label ui big label">
          <label>Title</label>
        </div>
        <div className={classes.search__container}>
          <Form.Input
            placeholder="Title"
            name="title"
            type="text"
            onChange={handleChange}
            value={formState.title}
          />
        </div>
      </Form.Field>
      <Form.Field>
        <div className="ui teal label ui big label">
          <label>Category</label>
        </div>
        <div className={classes.search__container}>{children}</div>
      </Form.Field>
      <Form.Field>
        <div className="ui teal label ui big label">
          <label>Description</label>
        </div>
        <div className={classes.search__container}>
          <Form.Input
            placeholder="Description"
            name="description"
            type="text"
            onChange={handleChange}
            value={formState.description}
          />
        </div>
      </Form.Field>
      <div className={`${classes.checkbox} ui checkbox`}>
        <Checkbox
          id="text"
          label="Make Deck Public"
          onChange={() => setPaywall(!paywall)}
        />
      </div>
      {paywall ? (
        <>
          <div>
            <Label className="ui teal label ui big label">Set Price</Label>
          </div>
          <Form.Input
            className={classes.price__container}
            placeholder="$0.99"
            name="price"
            type="text"
            onChange={handleChange}
          />
        </>
      ) : (
        <></>
      )}
      <Button inverted type="submit" color="teal" size="big">
        Create
      </Button>
    </Form>
  );
}

export default CreateDeck;
