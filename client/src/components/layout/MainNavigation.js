import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Icon, Input } from "semantic-ui-react";

import Auth from "../../utils/auth";

import classes from "./MainNavigation.module.css";

const DashboardButton = () => (
  <Menu.Item>
    <Button as={Link} to="/dashboard" inverted color="olive">
      Dashboard
    </Button>
  </Menu.Item>
);
const SearchBar = () => (
  <Menu.Item position="right">
    <Input icon='search' placeholder='Search...' />
  </Menu.Item>
)
const LoginButton = () => (
  <Menu.Item>
    <Button as={Link} to="/login" inverted color="orange">
      Log in
    </Button>
  </Menu.Item>
);
const SignupButton = () => (
  <Menu.Item>
    <Button as={Link} to="/signup" color="teal">
      Sign Up
    </Button>
  </Menu.Item>
);
const LogoutButton = (props) => (
  <Menu.Item>
    <Icon 
      name="log out" 
      color="red" 
      onClick={Auth.logout}
    />
  </Menu.Item>
);

const MainNavigation = () => {
  
  return (
    <Menu inverted>
      {
        Auth.isLoggedIn() ? (
          <>
            <DashboardButton />
            <SearchBar />
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginButton />
            <SearchBar />
            <SignupButton />
          </>
        )
      }
    </Menu>
  )
};
export default MainNavigation;
