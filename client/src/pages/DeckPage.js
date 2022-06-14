import React, {useState} from 'react';
import { useLocation } from "react-router-dom";

import { useMutation } from '@apollo/client';
import { ADD_CATEGORIES, UPDATE_DECK, UPDATE_CARD } from '../src/utils/mutations';

import Deck from "../components/quizmaster/Deck";

function DeckPage() { // expect deckId to be passed as a prop
  const location = useLocation();
  console.log('location:', location);
  // const deck = location.state;
  const [deckFormState, setDeckFormState] = useState(
    { title: "", description: "", categories: [], price: null }
  );
  const [cardFormState, setCardFormState] = useState({ sideA: "", sideB: "" });
  const [deck, setDeck] = useState(location.state);
  const [addCategories, {}] = useMutation(ADD_CATEGORIES);

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
      // const { data } = await addDeck({
      //   variables: {
      //     title: deckFormState.title,
      //     category: categories,
      //     description: deckFormState.description,
      //   },
      // });
      // const newDeck = data.addDeck;
      // console.log("ADD_DECK:", newDeck);
      // setDeck(data.addDeck);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('from:', from);
  // const { loading, error, data } = useQuery(GET_DECKS, 
  //   {
  //   // variables: { deckId }
  //   variables: { deckId: ""} // for testing
  // }
  // );
  const handleCardFormChange = async (event) => {
    const { name, value } = event.target;
    setCardFormState({ ...cardFormState, [name]: value });
  };
  const handleCardFormSubmit = async (event) => {
    event.preventDefault();
    // console.log({ ...cardFormState, deckId: deck._id });
    try {
      // const { data } = await addCard({
      //   variables: { ...cardFormState, deckId: deck._id },
      // });
      // const newDeck = data.addCard;
      // // console.log('ADD_CARD', newDeck);
      // setDeck(newDeck);
      // setCardState({ editing: false });
      // setCardFormState("");
    } catch (error) {
      console.log(error);
    }
  };
  // if (loading) return <div>Loading</div>;
  // if (error) return <div>Error! {`${error.message}`}</div>;
  console.log('DECK:', deck);
  // const deck = data.decks

  return (
    <section>
      <Deck 
        deck={deck}
        handleDeckFormChange={handleDeckFormChange}
        handleDeckFormSubmit={handleDeckFormSubmit}
        handleCardFormChange={handleCardFormChange}
        handleCardFormSubmit={handleCardFormSubmit}
      />
    </section>
  );
}

export default DeckPage;
