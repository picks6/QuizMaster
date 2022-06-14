import React, { useState } from "react";
import { Card, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

// import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART } from "../utils/actions";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  QUERY_DECKS,
  QUERY_DECKS_CATEGORY,
  QUERY_DECKS_TITLE,
} from "../utils/queries";

import Landing from "../components/quizmaster/Landing";
import Category from "../components/ui/Category";

import classes from "./LandingPage.module.css";
// import CardWrapper from "../components/ui/CardWrapper";
// const slugify = require("slugify");

const LandingPage = () => {
  // const [state, dispatch] = useStoreContext();

  const [decks, setDecks] = useState("");
  const [queryDecks, {}] = useLazyQuery(QUERY_DECKS);

  // const [categories, setCategories] = useState("");
  const [search, setSearch] = useState({title: "", categories: []});
  const [queryCategory, {}] = useLazyQuery(QUERY_DECKS_CATEGORY);
  const [queryTitle, {}] = useLazyQuery(QUERY_DECKS_TITLE);

  const handleFormChange = (event, value) => {
    if (event) {
      const { name, value } = event.target;
      setSearch({ ...search, title: value });
    } else {
      console.log('value:', value)
      setSearch({ ...search, categories: [...value] });
    }
  };
  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    // console.log('test', categories)
    if (search.categories.length && search.title !== "") {
      const args = search.categories.map(category => category.value);
      // console.log(search, args);
      const { data } = await queryDecks({ variables: { deckTitle: search.title, categories: args }});
      // console.log("QUERY_DECKS:", data.decks);
      setDecks(data.decks);
      return;
    } else if (search.categories.length) {
      const args = search.categories.map(category => category.value);
      // console.log(args);
      const { data } = await queryCategory({ variables: { categories: args } });
      // console.log("QUERY_DECKS_CATEGORY:", data.decksCategory);
      setDecks(data.decksCategory);
      return;
    } else if (search.title !== "") {
      // console.log(search);
      const { data } = await queryTitle({ variables: { deckTitle: search.title }});
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
