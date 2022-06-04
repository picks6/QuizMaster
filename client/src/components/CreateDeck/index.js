import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DECK } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { GET_DECKS } from '../../client/src/utils/queries';

function createDeck() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const [addDeck, { error }] = useMutation(ADD_DECK, {
        update(cache, { data: { addDeck } }) {
            try {
                const { newDeck } = cache.readQuery({ query: GET_DECKS });

                cache.writeQuery({
                    query: GET_DECKS,
                    data: { newDeck: [addDeck, ...newDeck] },
                })
            } catch (e) {
                console.log(e);
            }
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addDeck({
                variables: { title, category, description },
            });
            document.getElementById("Deck").classList.toggle("hide");
            document.getElementById("Card").classList.toggle("hide");

            
        } catch (err) {
            console.log(err);
        
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(title); 
        console.log(name)
        console.log(value)
        switch (name){
            case "title": setTitle(value); break; 
            case "category": setCategory(value); break;
            case "description": setDescription(value); break;
            default: break;
        }
    };

// WHAT DOES THE RETURN LOOK LIKE? 

}

export default createDeck;