import React, { useState } from "react";

import { Button, Form, Segment } from "semantic-ui-react";

const CardForm = ({ state, handleChange, handleSubmit, handleCancel }) => (
  <Form onSubmit={handleSubmit}>
    <Segment stacked>
      <Form.Input
        fluid
        placeholder="Front"
        name="sideA"
        type="text"
        value={state.sideA}
        onChange={handleChange}
      />
      <Form.Input
        fluid
        placeholder="Back"
        name="sideB"
        type="text"
        value={state.sideB}
        onChange={handleChange}
      />
      <Button color="blue" onClick={handleSubmit}>
        Submit
      </Button>
      <Button color="red" onClick={handleCancel}>
        Cancel
      </Button>
    </Segment>
  </Form>
);
export default CardForm;
