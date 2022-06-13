import React, { useState } from "react";
import DeckForm from "./DeckForm";

import classes from "./CreateDeck.module.css";
import "../../index.css";

export const CreateDeck = ({ state, handleChange, handleSubmit, handleCancel, children }) => {
  const styles = {
    label: "ui teal label ui big label",
    search__container: classes.search__container,
    checkbox: `${classes.checkbox} ui checkbox`,
    price: classes.price__container
  }
  return (
    <DeckForm 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      state={state}
      children={children}
      styles={styles}
    />
  );
};
