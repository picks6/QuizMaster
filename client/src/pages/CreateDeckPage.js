import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Category from "../components/ui/Category";
import { DeckForm } from "../components/quizmaster/DeckForm";
import {
  CreateCard,
  CreateCardHeader,
} from "../components/quizmaster/CreateCard";
import CardForm from "../components/quizmaster/CardForm";

import { useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_DECK } from "../utils/queries";
import {
  ADD_CATEGORIES,
  ADD_DECK,
  ADD_CARD,
  UPDATE_DECK,
  UPDATE_CARD,
  REMOVE_DECK,
  REMOVE_CARD,
} from "../utils/mutations";
import { Button, Grid } from "semantic-ui-react";
import "../index.css";
import SingleDeckWrapper from "../components/ui/SingleDeckWrapper";

function CreateDeckPage() {
  const params = useParams();
  const [queryDeck] = useLazyQuery(QUERY_DECK);
  const [addCategories] = useMutation(ADD_CATEGORIES);

  const [deckFormState, setDeckFormState] = useState({});
  const [cardFormState, setCardFormState] = useState({ sideA: "", sideB: "" });

  const [deck, setDeck] = useState("");
  const [addDeck] = useMutation(ADD_DECK);
  const [updateDeck] = useMutation(UPDATE_DECK);
  const [removeCard] = useMutation(REMOVE_CARD);
  const [removeDeck] = useMutation(REMOVE_DECK);

  useEffect(() => {
    const getDeck = async () => {
      try {
        if (params.id) {
          const { data } = await queryDeck({
            variables: { deckId: params.id },
          });
          setDeck(data.deck);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDeck();
  }, []);

  const [cardState, setCardState] = useState({ editing: false });
  const [addCard] = useMutation(ADD_CARD);
  const [updateCard] = useMutation(UPDATE_CARD);

  const handleDeckFormChange = (event, valueArr) => {
    if (event) {
      const { name, value } = event.target;
      setDeckFormState({ ...deckFormState, [name]: value });
    } else {
      setDeckFormState({ ...deckFormState, categories: [...valueArr] });
    }
  };
  const handleDeckFormSubmit = async (event, action) => {
    event.preventDefault();

    let categories;
    try {
      const newCategories = deckFormState.categories.filter(
        (category) => category.__isNew__ === true
      );
      if (newCategories.length) {
        const args = newCategories.map((category) => category.value);
        const { data } = await addCategories({
          variables: { categories: args },
        });
        const addedCategories = data.addCategories;
        console.log("addedCategories:", addedCategories);

        categories = deckFormState.categories.map((category) => {
          const index = addedCategories.findIndex((element) => {
            return element.category === category.value;
          });
          return index === -1 ? category.value : addedCategories[index]._id;
        });
      } else {
        categories = deckFormState.categories.map((category) => category.value);
      }

      if (action === "ADD_DECK") {
        const { data } = await addDeck({
          variables: {
            ...deckFormState,
            price: parseFloat(deckFormState.price),
            categories: categories,
          },
        });
        setDeck(data.addDeck);
      }
      if (action === "UPDATE_DECK") {
        // if (deckFormState.price) {
        //   setDeckFormState({
        //     ...deckFormState,
        //     price: parseFloat(deckFormState.price),
        //   });
        // }
        const { data } = await updateDeck({
          variables: {
            ...deckFormState,
            deckId: deck._id,
            price: parseFloat(deckFormState.price),
            categories: categories,
          },
        });
        setDeck(data.updateDeck);
      }
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
  const handleCardFormSubmit = async (event, action, cardId) => {
    event.preventDefault();
    try {
      if (action === "ADD_CARD") {
        const { data } = await addCard({
          variables: { ...cardFormState, deckId: deck._id },
        });
        setDeck(data.addCard);
      }
      if (action === "UPDATE_CARD") {
        const { data } = await updateCard({
          variables: { ...cardFormState, deckId: deck._id, cardId: cardId },
        });
        setDeck(data.updateCard);
      }

      setCardState({ editing: false });
      setCardFormState("");
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelCard = (event) => {
    event.preventDefault();
    setCardState({ editing: false });
    setCardFormState("");
    return;
  };

  const handleDelete = async (action, stateId) => {
    console.log(action, stateId);
    try {
      if (action === "REMOVE_DECK") {
        const { data } = await removeDeck({ variables: { deckId: stateId } });
        setDeck(data.removeDeck);
        return;
      }
      if (action === "REMOVE_CARD") {
        const { data } = await removeCard({ variables: { cardId: stateId } });
        setDeck(data.removeCard);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (deck === "") {
    return (
      <Grid columns={3} textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <DeckForm
              handleChange={handleDeckFormChange}
              handleSubmit={(event) => handleDeckFormSubmit(event, "ADD_DECK")}
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
  } else if (deck.title) {
    return (
      <Grid padded columns={3} textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column id="singleDeck__container">
            <SingleDeckWrapper>
              <CreateCardHeader
                deck={deck}
                state={deckFormState}
                handleChange={handleDeckFormChange}
                handleSubmit={handleDeckFormSubmit}
                handleDelete={handleDelete}
              />
              <CreateCard
                deck={deck}
                handleChange={handleCardFormChange}
                handleSubmit={handleCardFormSubmit}
                handleClick={handleClick}
                cardState={cardState}
                handleDelete={handleDelete}
              >
                <CardForm
                  handleChange={handleCardFormChange}
                  handleSubmit={(event) =>
                    handleCardFormSubmit(event, "ADD_CARD")
                  }
                  state={cardFormState}
                  handleCancel={handleCancelCard}
                />
              </CreateCard>
            </SingleDeckWrapper>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    return (
      <div>
        <div>Deck deleted.</div>
        <Button as={Link} to={"/dashboard"} inverted color="teal">
          Return to Dashboard
        </Button>
      </div>
    );
  }
}

export default CreateDeckPage;