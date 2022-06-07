import React, { useState } from "react";
import { Card } from "semantic-ui-react";

import Landing from '../components/quizmaster/Landing';
import CategorySelect from "../components/quizmaster/CategorySelect";

import { useLazyQuery } from "@apollo/client";
import { GET_DECKS } from "../utils/queries";
// import gql from 'graphql-tag'

const Search = ({ handleSubmit, updateSearch, search, children}) => (
  <form onSubmit={ handleSubmit }>
    <input
      type='text'
      onChange={ updateSearch }
      value={ search }
      placeholder='Search'
    />
  </form>
);
const LandingPage = () => {
  const [search, setSearch] = useState('');
  const [decks, setDecks] = useState('');
  const [categories, setCategories] = useState('');
  const [getDecks, {}] = useLazyQuery(GET_DECKS);

  const updateSearch = (event) => {
    const { name, value } = event.target;
    setSearch(value)
  }
  const handleSubmitSearch = async (event) => {
    event.preventDefault()
    const query = await getDecks();
    const decks = query.data.decks;
    console.log(decks);
    setDecks(decks);
  }
  
  return (
    <>
      <Search 
        handleSubmit={handleSubmitSearch} 
        updateSearch={updateSearch} 
        search={search}
      />
      <Card.Group>
      {
        decks.length 
          ? decks.map(
              deck => (
                <Card key={deck._id}>
                  <Card.Content>{deck.title}</Card.Content>
                  <Card.Content>{deck.category}</Card.Content>
                </Card>
              )
            )
          : <></>
      }
      </Card.Group>
      <CategorySelect />
    </>
  )
};
export default LandingPage;