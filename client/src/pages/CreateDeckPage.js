import React, { useState } from 'react';

import Category from '../components/quizmaster/Category';
import CreateDeck from "../components/quizmaster/CreateDeck";
import CreateCard from '../components/quizmaster/CreateCard';
import CardForm from '../components/quizmaster/CardForm';

import { useMutation } from '@apollo/client';
import { ADD_DECK, ADD_CARD } from '../utils/mutations';
import { Grid } from 'semantic-ui-react';

function CreateDeckPage() {
  const [categoryValue, setCategoryValue] = useState({category: '' })

  const [deckFormState, setDeckFormState] = useState(
    { title: '', categories: [], description: '' }
  );
  const [deck, setDeck] = useState('');
  const [addDeck, {}] = useMutation(ADD_DECK);

  const [cardState, setCardState] = useState({ editing: false });
  const [addCard, {}] = useMutation(ADD_CARD);

  const [cardFormState, setCardFormState] = useState(
    { sideA: '', sideB: '' }
  );

  const handleDeckFormChange = (event, valueArr) => {
    if (event) {
      const { name, value } = event.target;
      console.log('event:', {name, value});
      setDeckFormState({ ...deckFormState, [name]: value });
    } else {
      // console.log('state:', { ...deckFormState, categories: [...valueArr] });
      // const categories = valueArr.map(category => deckFormState.categories.push(category));
      // console.log('new array:', categories);
      setDeckFormState({ ...deckFormState, categories: [...valueArr] });
    }
  };
  const handleDeckFormSubmit = async (event) => {
    event.preventDefault();
    console.log('test:', {            
      title: deckFormState.title, 
      categories: [...deckFormState.categories], 
      description: deckFormState.description
    });
    try {
      const categories = deckFormState.categories.map(category => category.value);
      console.log('categories:', categories[0]);
      const { data } = await addDeck(
        {
          variables: {
            title: deckFormState.title, 
            category: categories, 
            description: deckFormState.description
          }
        }
      );
      // const newDeck = data.addDeck;
      // console.log('ADD_DECK:', newDeck);
      setDeck(data.addDeck);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClick = async (event) => {
    setCardState({ editing: true })
  }
  
  const handleCardFormChange = async (event) => {
    const { name, value } = event.target;
    setCardFormState({ ...cardFormState, [name]: value});
  };
  const handleCardFormSubmit = async (event) => {
    event.preventDefault();
    // console.log({ ...cardFormState, deckId: deck._id });
    try {
      const { data } = await addCard(
        { variables: { ...cardFormState, deckId: deck._id } }
      );
      const newDeck = data.addCard;
      // console.log('ADD_CARD', newDeck);
      setDeck(newDeck)
      setCardState({ editing: false });
      setCardFormState('');
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = (event) => {
    event.preventDefault();
    // console.log('test');
    setCardState({ editing: false });
    setCardFormState('');
  }
  
  if (deck === '') {
    return (
      <Grid columns={3} textAlign='center'>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <CreateDeck 
              handleChange={handleDeckFormChange} 
              handleFormSubmit={handleDeckFormSubmit} 
              formState={deckFormState}
            >
              <Category 
                placeholder={'Add a Category'}
                handleChange={handleDeckFormChange} 
                categoryState={deckFormState.categories}
              />
            </CreateDeck>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    return (
      <Grid columns={3} textAlign='center'>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <CreateCard  
              deck={deck} 
              handleClick={handleClick} 
              cardState={cardState}
            >
              <CardForm 
                handleFormSubmit={handleCardFormSubmit}
                handleChange={handleCardFormChange}
                cardFormState={cardFormState}
                handleCancel={handleCancel}
              />
            </CreateCard>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default CreateDeckPage;
