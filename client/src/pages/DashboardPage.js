import React, { 
  useEffect, 
  useReducer, 
  useRef, 
  useCallback 
} from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import Category from "../components/ui/Category";
import Searcher from "../components/ui/Searcher";

import Auth from "../utils/auth";

import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const DashboardPage = () => {
  // const [user, setUser] = useState("");
  const { loading, error, data } =useQuery(QUERY_USER);
  
  // const [decks, setDecks] = useState("");
  // const [search, setSearch] = useState("");
  // const [categories, setCategories] = useState("");

  // const updateSearch = (event, value) => {
  //   // if (event) {
  //   //   const { name, value } = event.target;
  //   //   setSearch(value);
  //   // } else {
  //   //   setCategories(value);
  //   // }
  // };
  // const handleSubmitSearch = async (event, data) => {
  //   event.preventDefault();
  //   // console.log('test');

  //   // const args = categories.map(category => category.value);
  //   // console.log(args);
  //   // const { data } = await getDecks(
  //   //   { variables: { categories: args }}
  //   // );

  //   // const decks = data.deckCategory;

  //   // console.log("QUERY_DECKS_CATEGORY:", decks);
  //   // setDecks(decks);
  // };
  if (loading) return <div>Loading</div>; 
  if (error) return `Error! ${error.message}`;

  const user = data.user;
  console.log('QUERY_USER:', user);

  return !(Auth.isLoggedIn()) 
    ? window.location.assign('/login') 
    : (
      <Segment placeholder>
        <Grid columns={3} textAlign='center'>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>

              <Header>User: {data.user.username}</Header>
            </Grid.Column>
            <Grid.Column>

              <Header icon>Create a Deck:</Header>
              <Button as={Link} to="/create-deck" primary>
                <Icon name='plus' />
              </Button>

            </Grid.Column>
            <Grid.Column>

              <Form 
                // onSubmit={handleSubmitSearch}
              >
                <Header>Quick Search: </Header>

                {/* <Category 
                  placeholder={''}
                  handleChange={updateSearch}
                  categoryState={categories} 
                /> */}
                <Searcher 
                  decks={user.decks}
                />
                <Button type="submit">Search</Button>
              </Form>

            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Header>Decks:</Header>
            <Card.Group>
              {
                user.decks.map(
                  (deck) => (
                    <Card as={Link} to={`/deck/${deck._id}/edit`} state={deck} key={deck._id}>
                      <Card.Content>{deck.title}</Card.Content>
                      <Card.Content>{deck.description}</Card.Content>
                      <Card.Content>
                        {deck.categories.map((category) => `${category.category} `)}
                      </Card.Content>
                    </Card>
                  )
                )
              }
            </Card.Group>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  
};
export default DashboardPage;