import React, { useEffect, useReducer, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Search,
  Form,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { useStoreContext } from "../utils/GlobalState";
import escapeRegExp from "../utils/escapeRegExp";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import "../index.css";
import "./DashboardPage.module.css";
import classes from "./DashboardPage.module.css";
import { SET_PERMISSIONS } from "../utils/actions";

const initialState = {
  loading: false,
  results: [],
  value: "",
};
const searcherReducer = (state, action) => {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return {
        ...state,
        loading: true,
        value: action.query,
      };
    case "FINISH_SEARCH":
      return {
        ...state,
        loading: false,
        results: action.results,
      };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };
    default:
      throw new Error();
  }
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef();
  const [dispatch] = useStoreContext();
  
  const [searcherState, searcherDispatch] = useReducer(searcherReducer, initialState);
  const { loading, error, data } = useQuery(QUERY_USER);

  useEffect(() => {
    const setPermissions = async () => {
      if (data) {
        await dispatch({ type: SET_PERMISSIONS, permissions: data.user.permissions });
      }
    };
    setPermissions();
  }, [data]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleSearchChange = useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    searcherDispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        searcherDispatch({ type: "CLEAN_QUERY" });
        return;
      }
      const re = new RegExp(escapeRegExp(data.value), "i");
      const isMatch = (result) => re.test(result.title);

      searcherDispatch({ type: "FINISH_SEARCH", results: user.decks.filter(isMatch) });
    }, 300);
  }, [data]);

  if (loading) return <div>Loading</div>;
  if (error) return `Error! ${error.message}`;
  
  const user = data.user;

  const decks = searcherState.results.length ? searcherState.results : user.decks;

  if (!Auth.isLoggedIn()) {
    navigate("/login");
  } else {
    return (
      <Segment inverted className="container" placeholder>
        <Grid stackable columns={3} textAlign="center">
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header size="huge" inverted color="teal">
                Welcome {data.user.username}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header size="large" inverted color="teal" icon>
                Create a Deck:
              </Header>
              <Button as={Link} to="/create-deck" inverted color="teal">
                <Icon name="plus" />
              </Button>
            </Grid.Column>
            <Grid.Column className={classes.search}>
              <Form
              // onSubmit={handleSubmitSearch}
              >
                <Header id="quicksearch" size="large" inverted color="teal">
                  Quick Search:{" "}
                </Header>
                <Search
                  className={classes.search}
                  loading={searcherState.loading}
                  placeholder="Search your decks:"
                  onResultSelect={(event, data) =>
                    searcherDispatch({ type: "UPDATE_SELECTION", selection: data.result.title })
                  }
                  onSearchChange={handleSearchChange}
                  results={searcherState.results}
                  value={searcherState.value}

                />
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row id="decks__div">
            <Header
              className={classes.header}
              size="large"
              inverted
              color="teal"
            >
              Decks:
            </Header>
            <Card.Group>
              {
                decks.map((deck) => (
                  <Card
                    as={Link}
                    to={`/deck/${deck._id}/edit`}
                    state={deck}
                    key={deck._id}
                  >
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
  }
};
export default DashboardPage;
