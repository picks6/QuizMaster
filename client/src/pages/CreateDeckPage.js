import React, { useState } from "react";

import Category from "../components/ui/Category";
import { CreateDeck } from "../components/quizmaster/CreateDeck";
import { CreateCard, CreateCardHeader } from "../components/quizmaster/CreateCard";
import CardForm from "../components/quizmaster/CardForm";

import { useMutation } from "@apollo/client";
import { ADD_CATEGORIES, ADD_DECK, ADD_CARD } from "../utils/mutations";
import { Grid, Segment } from "semantic-ui-react";
import "../index.css";

function CreateDeckPage() {
  // const [categoryValue, setCategoryValue] = useState({category: '' })
  const [addCategories, {}] = useMutation(ADD_CATEGORIES);

  const [deckFormState, setDeckFormState] = useState({
    title: "",
    categories: [],
    description: "",
    price: null
  });
  const [cardFormState, setCardFormState] = useState({ sideA: "", sideB: "" });
  
  const [deck, setDeck] = useState("");
  const [addDeck, {}] = useMutation(ADD_DECK);

  const [cardState, setCardState] = useState({ editing: false });
  const [addCard, {}] = useMutation(ADD_CARD);

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
  const handleDeckFormSubmit = async (event) => {
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
        // console.log("addedCategories:", addedCategories);

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
      const { data } = await addDeck({
        variables: {
          ...deckFormState,
          price: parseFloat(deckFormState.price),
          categories: categories
        },
      });
      const newDeck = data.addDeck;
      // console.log("ADD_DECK:", newDeck);
      setDeck(data.addDeck);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (event) => {
    setCardState({ editing: true });
  };

  const handleCardFormChange = async (event) => {
    const { name, value } = event.target;
    setCardFormState({ ...cardFormState, [name]: value });
  };
  const handleCardFormSubmit = async (event) => {
    event.preventDefault();
    // console.log({ ...cardFormState, deckId: deck._id });
    try {
      const { data } = await addCard({
        variables: { ...cardFormState, deckId: deck._id },
      });
      const newDeck = data.addCard;
      // console.log('ADD_CARD', newDeck);
      setDeck(newDeck);
      setCardState({ editing: false });
      setCardFormState("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = (event) => {
    event.preventDefault();
    // console.log('test');
    setCardState({ editing: false });
    setCardFormState("");
  };

  if (deck === "") {
    return (
      <Grid columns={3} textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <CreateDeck
              handleChange={handleDeckFormChange}
              handleSubmit={handleDeckFormSubmit}
              state={deckFormState}
            >
              <Category
                placeholder={"Add a Category"}
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
      <Grid columns={3} textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <CreateCardHeader deck={deck} />
            <CreateCard
              deck={deck}
              handleSubmit={handleCardFormSubmit}
              handleChange={handleCardFormChange}
              handleCancel={handleCancel}
              handleClick={handleClick}
              cardState={cardState}
            >
              <CardForm
                handleSubmit={handleCardFormSubmit}
                handleChange={handleCardFormChange}
                state={cardFormState}
                handleCancel={handleCancel}
              />
            </CreateCard>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default CreateDeckPage;
