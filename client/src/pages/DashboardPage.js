import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
} from 'semantic-ui-react';

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const DashboardPage = () => {
  const [userState, setUser] = useState('');
  const { loading, error, data } =useQuery(QUERY_USER);

  if (loading) return <div>Loading</div>; 
  if (error) return `Error! ${error.message}`;
  console.log(data);
  // setUser(data); 
  return (
    <Segment placeholder>
      <Grid columns={3} textAlign='center'>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Header icon>
              Create a Deck
            </Header>
            <Button as={Link} to="/create-deck" primary>
              <Icon name='plus' />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
export default DashboardPage;