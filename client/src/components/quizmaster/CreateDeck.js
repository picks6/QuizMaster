import React, { useState } from 'react';

import { Form, Button, Checkbox } from 'semantic-ui-react';

function CreateDeck({ handleChange, handleFormSubmit, formState, children }) {
  const [paywall, setPaywall] = useState(false);
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Field>
        <label>Title</label>
        <Form.Input 
          placeholder='Title' 
          name='title' 
          type='text'
          onChange={handleChange} 
          value={formState.title} 
        />
      </Form.Field>
      <Form.Field>
        <label>Category</label>
        {children}
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <Form.Input 
          placeholder='Description' 
          name='description' 
          type='text' 
          onChange={handleChange} 
          value={formState.description} 
        />
      </Form.Field>
      <Form.Field>
        <Checkbox onChange={() => setPaywall(!paywall)}>Paywall Deck</Checkbox>
        {
          paywall ? (
            <Form.Input placeholder='Price' type='text'/>
          ): <></>
        }
      </Form.Field>
      <Button type='submit'>Create</Button>
    </Form>
  )
}

export default CreateDeck;