import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

import { useLazyQuery } from "@apollo/client";
import {
  QUERY_DECKS,
  QUERY_DECKS_CATEGORY,
  QUERY_DECKS_TITLE,
} from "../utils/queries";

import Landing from "../components/quizmaster/Landing";
import Category from "../components/ui/Category";

import classes from "./LandingPage.module.css";


const LandingPage = () => {
  const [decks, setDecks] = useState("");
  const [queryDecks] = useLazyQuery(QUERY_DECKS);
  const [search, setSearch] = useState({title: "", categories: []});
  const [queryCategory] = useLazyQuery(QUERY_DECKS_CATEGORY);
  const [queryTitle] = useLazyQuery(QUERY_DECKS_TITLE);

  const handleFormChange = (event, value) => {
    if (event) {
      const { value } = event.target;
      setSearch({ ...search, title: value });
    } else {
      setSearch({ ...search, categories: [...value] });
    }
  };
  const handleSubmitSearch = async (event) => {
    event.preventDefault();

    if (search.categories.length && search.title !== "") {
      const args = search.categories.map(category => category.value);

      const { data } = await queryDecks({ variables: { deckTitle: search.title, categories: args }});

      setDecks(data.decks);
      return;
    } else if (search.categories.length) {
      const args = search.categories.map(category => category.value);

      const { data } = await queryCategory({ variables: { categories: args } });

      setDecks(data.decksCategory);
      return;
    } else if (search.title !== "") {

      const { data } = await queryTitle({ variables: { deckTitle: search.title }});

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
            categoryState={search.categories}
          />
        </div>
        <div className={classes.search__container}>
          <Form.Input
            placeholder={"Search Decks..."}
            onChange={handleFormChange}
            value={search.title}
          />
        </div>
        <Button inverted color="teal" type="submit">
          Search
        </Button>
      </Form>
      <Landing decks={decks} />
    </>
  );
};
export default LandingPage;
