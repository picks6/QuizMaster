import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import LoginWrapper from "../ui/LoginWrapper";

import Auth from "../../utils/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LoginWrapper>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 550 }}>
          <Header id="signup__header" as="h2" color="teal" textAlign="center">
            Signup
          </Header>

          {data ? (
            <p>
              Success! You may now head{" "}
              {/* <Link to="/">back to the homepage.</Link> */}
            </p>
          ) : (
            <Form id="signup" onSubmit={handleFormSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  placeholder="********"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button color="teal" fluid size="large">
                  Submit
                </Button>
              </Segment>
            </Form>
          )}

          {error && <div>{error.message}</div>}
        </Grid.Column>
      </Grid>
    </LoginWrapper>
  );
};

export default Signup;
