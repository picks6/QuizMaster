import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

import Logout from "../../components/quizmaster/Logout";
import Auth from "../../utils/auth";
import classes from "./Login.module.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
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
      const { data } = await login({
        variables: { ...formState },
      });
      setFormState({ email: "", password: "" });
      Auth.login(data.login.token);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 550 }}>
        <Header id="login__header" as="h2" color="teal" textAlign="center">
          Login
        </Header>
        {data ? (
          <p>
            Success! Redirecting to Dashboard...
            {/* <Link to="/">back to the homepage.</Link> */}
          </p>
        ) : (
          <Form id="login" onSubmit={handleFormSubmit}>
            <Segment stacked></Segment>
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
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Button
              color="teal"
              fluid
              size="large"
              style={{ cursor: "pointer" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Login;
