import React, { useState } from "react";
import { Modal, Icon, Button } from "semantic-ui-react";

import { DeckForm } from "./DeckForm";

import Category from "../ui/Category";
import CardForm from "./CardForm";
import classes from "./Actions.module.css";
import "../../index.css";

const Action = ({ state, setState, icon, header, children }) => (
  <Modal
    id="modal"
    className={classes.modal}
    onClose={() => setState(false)}
    onOpen={() => setState(true)}
    open={state}
    trigger={<Icon name={icon} />}
  >
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>{children}</Modal.Content>
  </Modal>
);

export const EditDeck = ({ state, handleChange, handleSubmit }) => {
  const [editingDeck, setEditingDeck] = useState(false);
  return (
    <Action
      state={editingDeck}
      setState={setEditingDeck}
      icon={"edit"}
      header={"Edit Deck Information:"}
    >
      <DeckForm
        handleChange={handleChange}
        handleSubmit={async (event) => {
          await handleSubmit(event, "UPDATE_DECK");
          setEditingDeck(false);
          window.location.reload();
        }}
        handleCancel={() => setEditingDeck(false)}
        state={state}
      >
        <Category
          placeholder={"Add a Category"}
          handleChange={handleChange}
          categoryState={state.categories}
        />
      </DeckForm>
    </Action>
  );
};

export const EditCard = ({ state, card, handleChange, handleSubmit }) => {
  const [editingCard, setEditingCard] = useState(false);
  return (
    <Action
      state={editingCard}
      setState={setEditingCard}
      icon={"edit"}
      header={"Edit Card:"}
    >
      <CardForm
        state={state}
        card={card}
        handleChange={handleChange}
        handleSubmit={async (event) => {
          await handleSubmit(event, "UPDATE_CARD", card._id);
          setEditingCard(false);
        }}
        handleCancel={() => setEditingCard(false)}
      />
    </Action>
  );
};
export const Delete = ({ header, action, stateId, handleDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Action
      state={confirmDelete}
      setState={setConfirmDelete}
      icon={"trash alternate"}
      header={header}
    >
      <Button
        onClick={async () => {
          console.log("test");
          await handleDelete(action, stateId);
          setConfirmDelete(false);
        }}
      >
        Delete
      </Button>
      <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
    </Action>
  );
};
