import React, { useState } from "react";
import { Card } from "semantic-ui-react";

import Landing from "../components/quizmaster/Landing";

import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_DECKS, GET_CATEGORIES } from "../utils/queries";
// import { set } from "../../../server/models/Card";
// import gql from 'graphql-tag'

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
  const [getDecks, {}] = useLazyQuery(GET_DECKS);

  const [categories, setCategories] = useState("");
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const updateSearch = (event) => {
    const { name, value } = event.target;
    setSearch(value);
  };
  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    const query = await getDecks();
    const decks = query.data.decks;
    console.log("GET_DECKS:", decks);
    setDecks(decks);
  };

  if (loading) return <div>Loading</div>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className={classes.search__container}>
        <Search
          handleSubmit={handleSubmitSearch}
          updateSearch={updateSearch}
          search={search}
        />
      </div>
      <Card.Group>
        {decks.length ? (
          decks.map((deck) => (
            <Card key={deck._id}>
              <Card.Content>{deck.title}</Card.Content>
              <Card.Content>
                {deck.categories.map((category) => `${category.category}`)}
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
