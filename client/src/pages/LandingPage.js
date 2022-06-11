import React, { useState } from "react";
import { Card, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Landing from "../components/quizmaster/Landing";
import Category from "../components/ui/Category";

import { useLazyQuery, useQuery } from "@apollo/client";
import {
  QUERY_DECKS,
  QUERY_DECKS_CATEGORY,
  QUERY_DECKS_TITLE,
} from "../utils/queries";

import classes from "./LandingPage.module.css";
import CardWrapper from "../components/ui/CardWrapper";
const slugify = require("slugify");

const LandingPage = () => {
  const [decks, setDecks] = useState("");
  const [queryDecks, {}] = useLazyQuery(QUERY_DECKS);

  const [categories, setCategories] = useState("");
  const [queryCategory, {}] = useLazyQuery(QUERY_DECKS_CATEGORY);

  const [search, setSearch] = useState("");
  const [queryTitle, {}] = useLazyQuery(QUERY_DECKS_TITLE);

  const handleFormChange = (event, value) => {
    if (event) {
      const { name, value } = event.target;
      setSearch(value);
    } else {
      setCategories(value);
    }
  };
  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    // console.log('test', categories)
    if (categories.length && search !== "") {
      const args = categories.map((category) => category.value);
      // console.log(search, args);
      const { data } = await queryDecks({
        variables: { deckTitle: search, categories: args },
      });
      // console.log("QUERY_DECKS:", data.decks);
      setDecks(data.decks);
      return;
    } else if (categories.length) {
      const args = categories.map((category) => category.value);
      // console.log(args);
      const { data } = await queryCategory({ variables: { categories: args } });
      // console.log("QUERY_DECKS_CATEGORY:", data.decksCategory);
      setDecks(data.decksCategory);
      return;
    } else if (search !== "") {
      // console.log(search);
      const { data } = await queryTitle({ variables: { deckTitle: search } });
      // console.log("QUERY_DECKS_TITLE", data.decksTitle);
      setDecks(data.decksTitle);
      return;
    } else {
      return;
    }
  };

  return (
    <>
      <Form size="big" className={classes.form} onSubmit={handleSubmitSearch}>
        <div className={classes.search__container}>
          <Category
            placeholder={"Select a Category"}
            handleChange={handleFormChange}
            categoryState={categories}
          />
        </div>
        <div className={classes.search__container}>
          <Form.Input
            placeholder={"Search Decks..."}
            onChange={handleFormChange}
          />
        </div>
        <Button inverted color="teal" type="submit">
          Search
        </Button>
      </Form>
      <CardWrapper>
        <Card.Group>
          {decks.length ? (
            decks.map((deck) => (
              <Card
                color="blue"
                as={Link}
                to={`/deck/${slugify(deck.title)}/${deck._id}`}
                state={deck}
                key={deck._id}
              >
                <Card.Content>{deck.title}</Card.Content>
                <Card.Content>{deck.description}</Card.Content>
                <Card.Content>
                  {deck.categories.map((category) => `${category.category} `)}
                </Card.Content>
              </Card>
            ))
          ) : (
            <></>
          )}
        </Card.Group>
      </CardWrapper>
    </>
  );
};
export default LandingPage;
