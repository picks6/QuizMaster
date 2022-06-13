import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Category from "../components/ui/Category";
import { DeckForm } from "../components/quizmaster/DeckForm";
import { CreateCard, CreateCardHeader } from "../components/quizmaster/CreateCard";
import CardForm from "../components/quizmaster/CardForm";

import { useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_DECK } from "../utils/queries";
import { ADD_CATEGORIES, ADD_DECK, ADD_CARD, UPDATE_DECK, UPDATE_CARD } from "../utils/mutations";
import { Grid, Segment } from "semantic-ui-react";
import "../index.css";

function CreateDeckPage() {
  const params = useParams();
  const [queryDeck, {}] = useLazyQuery(QUERY_DECK);
  const [addCategories, {}] = useMutation(ADD_CATEGORIES);

  const [deckFormState, setDeckFormState] = useState({});
  const [cardFormState, setCardFormState] = useState({ sideA: "", sideB: "" });
  
  const [deck, setDeck] = useState(false);
  const [addDeck, {}] = useMutation(ADD_DECK);
  const [updateDeck, {}] = useMutation(UPDATE_DECK);

  useEffect(() => {
    const getDeck = async () => {
      try {
        if (params.id) {
          console.log(params);
          const { data } = await queryDeck({
            variables: { deckId: params.id }
          })
          console.log('queryDeck:',data.deck);
          setDeck(data.deck);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDeck();
  }, []);

  const [cardState, setCardState] = useState({ editing: false });
  const [addCard, {}] = useMutation(ADD_CARD);
  const [updateCard, {}] = useMutation(UPDATE_CARD);

  const handleDeckFormChange = (event, valueArr) => {
    if (event) {
      const { name, value } = event.target;
      // console.log("event:", { name, value });
      setDeckFormState({ ...deckFormState, [name]: value });
    } else {
      console.log("state:", { ...deckFormState, categories: [...valueArr] });
      // const categories = valueArr.map(category => deckFormState.categories.push(category));
      // console.log('new array:', categories);
      setDeckFormState({ ...deckFormState, categories: [...valueArr] });
    }
  };
  const handleDeckFormSubmit = async (event, action) => {
    event.preventDefault();
    // console.log("test:", {
    //   title: deckFormState.title,
    //   categories: [...deckFormState.categories],
    //   description: deckFormState.description,
    // });
    let categories;
    try {
      const newCategories = deckFormState.categories.filter(
        (category) => category.__isNew__ === true
      );
      // console.log("newCategories:", newCategories);
      if (newCategories.length) {
        const args = newCategories.map((category) => category.value);
        // console.log('variables:', args);
        const { data } = await addCategories({ variables: { categories: args }});
        // console.log('test:', data);
        const addedCategories = data.addCategories;
        console.log("addedCategories:", addedCategories);

        categories = deckFormState.categories.map((category) => {
          const index = addedCategories.findIndex((element) => {
            // console.log(element.category, category.value);
            return element.category === category.value;
          });
          // console.log(index);
          return index === -1 ? category.value : addedCategories[index]._id;
        });
        // console.log("categories:", categories);
      } else {
        categories = deckFormState.categories.map((category) => category.value);
        // console.log("categories:", categories);
      }

      if (action === 'ADD_DECK') {
        const { data } = await addDeck({
          variables: {
            ...deckFormState,
            price: parseFloat(deckFormState.price),
            categories: categories
          },
        });
        console.log("ADD_DECK:", data);
        setDeck(data.addDeck);
        return;
      } 
      if (action === 'UPDATE_DECK') {
        const { data } = await updateDeck({
          variables: {
            ...deckFormState,
            deckId: deck._id,
            price: parseFloat(deckFormState.price),
            categories: categories
          }
        });
        console.log('update deck:', data);
        setDeck(data.updateDeck);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (event) => {
    setCardState({ editing: true });
    return;
  };

  const handleCardFormChange = async (event) => {
    const { name, value } = event.target;
    setCardFormState({ ...cardFormState, [name]: value });
  };
  const handleCardFormSubmit = async (event, action, cardId) => {
    event.preventDefault();
    // console.log({ ...cardFormState, deckId: deck._id });
    try {
      if (action === 'ADD_CARD') {
        const { data } = await addCard(
          { variables: { ...cardFormState, deckId: deck._id }}
        );
        // console.log('ADD_CARD', data.addCard);
        setDeck(data.addCard);
      }
      if (action === 'UPDATE_CARD') {
        console.log(deck._id, cardId);
        const { data } = await updateCard({
          variables: { ...cardFormState, deckId: deck._id, cardId: cardId }
        });
        console.log('UPDATE_CARD:', data.update);
        setDeck(data.updateCard);
      };

      setCardState({ editing: false });
      setCardFormState("");
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelCard = (event) => {
    event.preventDefault();
    // console.log('test');
    setCardState({ editing: false });
    setCardFormState("");
    return;
  };

  if (!deck) {
    return (
      <Grid columns={3} textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <DeckForm
              handleChange={handleDeckFormChange}
              handleSubmit={(event) => handleDeckFormSubmit(event, 'ADD_DECK')}
              state={deckFormState}
            >
              <Category
                placeholder={"Add a Category"}
                handleChange={handleDeckFormChange}
                categoryState={deckFormState.categories}
              />
            </DeckForm>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    return (
      <Grid columns={3} textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <CreateCardHeader 
              deck={deck} 
              state={deckFormState}
              handleChange={handleDeckFormChange} 
              handleSubmit={handleDeckFormSubmit}
            />
            <CreateCard
              deck={deck}
              handleChange={handleCardFormChange}
              handleSubmit={handleCardFormSubmit}
              handleClick={handleClick}
              cardState={cardState}
            >
              <CardForm
                handleChange={handleCardFormChange}
                handleSubmit={(event) => handleCardFormSubmit(event, 'ADD_CARD')}
                state={cardFormState}
                handleCancel={handleCancelCard}
              />
            </CreateCard>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default CreateDeckPage;
