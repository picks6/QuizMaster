import React, { useState } from 'react';

import { Form, Button, Checkbox } from 'semantic-ui-react';

// import { useMutation } from '@apollo/client';
// import { ADD_DECK } from '../../utils/mutations';
// import { Link } from 'react-router-dom';

function CreateDeck({ handleChange, handleFormSubmit, formState }) {
    // const [title, setTitle] = useState('');
    // const [category, setCategory] = useState('');
    // const [description, setDescription] = useState('');

    // const [deck, setDeck] = useState('');

    // const [addDeck, { error }] = useMutation(ADD_DECK, 
    //     // {
    //     //     update(cache, { data: { addDeck } }) {
    //     //         try {
    //     //             const { newDeck } = cache.readQuery({ query: GET_DECKS });

    //     //             cache.writeQuery({
    //     //                 query: GET_DECKS,
    //     //                 data: { newDeck: [addDeck, ...newDeck] },
    //     //             })
    //     //         } catch (e) {
    //     //             console.log(e);
    //     //         }
    //     //     }
    //     // }
    // );

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const { data } = await addDeck(
    //             {variables: { title, category, description }}
    //         );
    //         // document.getElementById("Deck").classList.toggle("hide");
    //         // document.getElementById("Card").classList.toggle("hide");
    //         console.log('ADD_DECK:', data.addDeck);
    //         setDeck(data.addDeck);
    //     } catch (err) {
    //         console.log(err);
        
    //     }
    // };

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     // console.log(title); 
    //     // console.log(name)
    //     // console.log(value)
    //     switch (name) {
    //         case "title": setTitle(value); break; 
    //         case "category": setCategory(value); break;
    //         case "description": setDescription(value); break;
    //         default: break;
    //     }
    // };

// WHAT DOES THE RETURN LOOK LIKE? 
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
              <label>Description</label>

              <Form.Input 
                placeholder='Description' 
                name='description' 
                type='text' 
                onChange={handleChange} 
                value={formState.description} 
              />
            </Form.Field>

            <Button type='submit'>Create</Button>
        </Form>
    )
}

export default CreateDeck;