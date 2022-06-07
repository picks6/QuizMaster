import React from "react";
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

const DashboardPage = () => {
  return (
    <Segment placeholder>
      <Grid columns={1} textAlign='center'>
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