import React from "react";
import { Link } from "react-router-dom";

import { Menu, Button, Icon } from "@semantic-ui-react";
import classes from "./MainNavigation.module.css";

<Menu inverted>
  <Menu.Item>
    <Button as={Link} to="/dashboard" inverted color="olive">
      Dashboard
    </Button>
  </Menu.Item>
  <Menu.Item position="right">
    <Button as={Link} to="/login" inverted color="orange">
      Log in
    </Button>
  </Menu.Item>
  <Menu.Item>
    <Button as={Link} to="/signup" color="teal">
      Sign Up
    </Button>
  </Menu.Item>
  <Menu.Item>
    <Icon name="log out" color="red"></Icon>
  </Menu.Item>
</Menu>;
