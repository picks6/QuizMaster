import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Auth from "../../utils/auth";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
  }
  
  return (
    <Button inverted
      color="purple" 
      content="Logout" 
      onClick={handleLogout}
    />
  )
};

export default Logout;