import React, { useState } from 'react';

import { Form, Button } from 'semantic-ui-react';

function CreateDeck({ handleChange, handleFormSubmit, formState, children }) {
    
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
        <Form.Input 
          placeholder='Category' 
          name='category' 
          type='text' 
          onChange={handleChange} 
          value={formState.category} 
        />
      </Form.Field>
      <Form.Field>
        {children}
      </Form.Field>
      <Button type='submit'>Create</Button>
    </Form>
  )
}

export default CreateDeck;