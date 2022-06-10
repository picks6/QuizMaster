import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
} from 'semantic-ui-react';
import Category from "../components/quizmaster/Category";

import Auth from "../utils/auth";

import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_DECKS_CATEGORY } from "../utils/queries";

const DashboardPage = () => {
  const [userState, setUser] = useState('');
  const { loading, error, data } =useQuery(QUERY_USER);

  const [decks, setDecks] = useState("");
  const [getDecks, {}] = useLazyQuery(QUERY_DECKS_CATEGORY);
  
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState("");

  const updateSearch = (event, value) => {
    if (event) {
      const { name, value } = event.target;
      setSearch(value);
    } else {
      setCategories(value);
    }
  };
  const handleSubmitSearch = async (event) => {
    // console.log('test')
    event.preventDefault();

    const args = categories.map(category => category.value);
    // console.log(args);
    const { data } = await getDecks(
      { variables: { categories: args }}
    );

    const decks = data.deckCategory;

    // console.log("QUERY_DECKS_CATEGORY:", decks);
    setDecks(decks);
  };

  if (loading) return <div>Loading</div>; 
  if (error) return `Error! ${error.message}`;
  // console.log(data);
  // setUser(data); 
  return !(Auth.isLoggedIn()) 
    ? window.location.assign('/login') 
    : (
      <Segment placeholder>
        <Grid columns={3} textAlign='center'>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>

              <Header icon>Create a Deck:</Header>
              <Button as={Link} to="/create-deck" primary>
                <Icon name='plus' />
              </Button>

            </Grid.Column>
            <Grid.Column>

              <Form onSubmit={handleSubmitSearch}>
                <Header>Your Decks: </Header>
                <Search 
                  placeholder="Search Your Decks:"
                />
                <Category 
                  placeholder={''}
                  handleChange={updateSearch}
                  categoryState={categories} 
                />
                <Button type="submit">Search</Button>
              </Form>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  
};
export default DashboardPage;