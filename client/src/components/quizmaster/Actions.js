import React, { useState } from "react";
import { Modal, Icon, Button } from 'semantic-ui-react';

import { CreateDeck } from "./CreateDeck";
import Category from "../ui/Category";
import CardForm from "./CardForm";

const Action = ({ state, setState, icon, header, children }) => (
  <Modal 
    onClose={() => setState(false)}
    onOpen={() => setState(true)}
    open={state}
    trigger={<Icon name={icon} />}
  >
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>
      {children}
    </Modal.Content>
  </Modal>
);

export const EditDeck = ({ state, handleChange, handleSubmit, handleCancel}) => {
  const [editingDeck, setEditingDeck] = useState(false);
  return (
    <Action 
      state={editingDeck} 
      setState={setEditingDeck} 
      icon={'edit'} 
      header={'Edit Deck Information:'}
    >
      <CreateDeck 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={() => setEditingDeck(false)}
        state={state}
        // styles={styles}
      >
        <Category
          placeholder={"Add a Category"}
          handleChange={handleChange}
          categoryState={state.categories}
        />
      </CreateDeck>
    </Action>
  )
};

export const EditCard = ({ state, handleChange, handleSubmit, handleCancel }) => {
  const [editingCard, setEditingCard] = useState(false);
  return (
    <Action 
      state={editingCard} 
      setState={setEditingCard} 
      icon={'edit'} 
      header={'Edit Card:'}
    >
      <CardForm 
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={() => setEditingCard(false)}
      />
    </Action>
  )
}
export const Delete = ({ handleConfirm, handleCancel, header }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <Action 
      state={confirmDelete} 
      setState={setConfirmDelete} 
      icon={'trash alternate'} 
      header={header}
    >
      <Button onClick={handleConfirm}>Delete</Button>
      <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
    </Action>

  )
};