import React, { useState } from "react";

import { Form, Button, Checkbox } from "semantic-ui-react";

import classes from "./CreateDeck.module.css";

function CreateDeck({ handleChange, handleFormSubmit, formState, children }) {
  const [paywall, setPaywall] = useState(false);
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
      <span className={classes.checkbox}>
        <Checkbox onChange={() => setPaywall(!paywall)}>Paywall Deck</Checkbox>
      </span>
      {paywall ? <Form.Input placeholder="Price" type="text" /> : <></>}
      <Button inverted type="submit" color="teal" size="big">
        Create
      </Button>
    </Form>
  );
}

export default CreateDeck;
