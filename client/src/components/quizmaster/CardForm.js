import React, { useState } from 'react';

import { Button, Form, Segment } from 'semantic-ui-react';

const CardForm = ({ cardFormState, handleChange, handleFormSubmit, handleCancel }) => (
  <Form onSubmit={handleFormSubmit}>
    <Segment stacked>
      <Form.Input
        fluid 
        name='sideA' 
        type='text' 
        value={cardFormState.sideA}
        onChange={handleChange}
      />
      <Form.Input
        fluid 
        name='sideB' 
        type='text' 
        value={cardFormState.sideB}
        onChange={handleChange}
      />
      <Button>
        Submit
      </Button>
      <Button onClick={handleCancel}>
        Cancel
      </Button>
    </Segment>
  </Form>
);
export default CardForm;