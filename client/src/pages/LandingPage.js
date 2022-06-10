import React, { useState } from "react";
import { Card, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Landing from "../components/quizmaster/Landing";
import Category from "../components/quizmaster/Category";

import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_DECKS_CATEGORY, GET_DECKS, GET_CATEGORIES } from "../utils/queries";
// import { set } from "../../../server/models/Card";
// import gql from 'graphql-tag'

import escapeRegExp from "../utils/escapeRegExp";

import classes from "./LandingPage.module.css";

const Search = ({ handleSubmit, updateSearch, search }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      onChange={updateSearch}
      value={search}
      placeholder="Search"
    />
  </form>
);
const LandingPage = () => {
  const [search, setSearch] = useState("");
  const [decks, setDecks] = useState("");
  const [getDecks, {}] = useLazyQuery(QUERY_DECKS_CATEGORY);

  const [categories, setCategories] = useState("");
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const updateSearch = (event, value) => {
    if (event) {
      const { name, value } = event.target;
      setSearch(value);
    } else {
      setCategories(value);
    }
  };
  const handleSubmitSearch = async (event) => {
    console.log('test', categories)
    event.preventDefault();
    if (categories.length) {
      const args = categories.map(category => category.value);
      console.log(args);
      const { data } = await getDecks(
        { variables: { categories: args }}
      );
  
      const decks = data.deckCategory;
      console.log("QUERY_DECKS_CATEGORY:", decks);
      if (search !== "") {
        let re = new RegExp(escapeRegExp(search), 'i');
        setDecks(
          decks.filter(deck => re.test(deck.title))
        );
      } else {
        setDecks(decks);
      }  
    } else if (search !== "") {
      let re = new RegExp(escapeRegExp(search), 'i');

    } else {
      return
    }
  };

  if (loading) return <div>Loading</div>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Form onSubmit={handleSubmitSearch}>
        <div className={classes.search__container}>
          <Category 
            placeholder={'Select a Category'}
            handleChange={updateSearch}
            categoryState={categories}
          />
          <Form.Input 
            placeholder={'Search Decks...'}
            onChange={updateSearch}
          />
        </div>
        <Button type="submit">Search</Button>
      </Form>
      <Card.Group>
        {decks.length ? (
          decks.map((deck) => (
            <Card as={Link} to="/deck" state={deck} key={deck._id}>
              <Card.Content>{deck.title}</Card.Content>
              <Card.Content>
                {deck.categories.map((category) => `${category.category} `)}
              </Card.Content>
            </Card>
          ))
        ) : (
          <></>
        )}
      </Card.Group>
    </>
  );
};
export default LandingPage;
