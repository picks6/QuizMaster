import React, { useState} from "react";
import { Button } from "semantic-ui-react";
import Auth from "../../utils/auth";

const Logout = () => {
  return (
    <Button 
      color="purple" 
      content="Logout" 
      onClick={Auth.logout}
    />
  )
};

export default Logout;