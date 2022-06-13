import React, { useState } from "react";
import { Modal, Icon, Button } from 'semantic-ui-react';

import { DeckForm } from "./DeckForm";
import { REMOVE_DECK, REMOVE_CARD } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
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

export const EditDeck = ({ state, handleChange, handleSubmit}) => {
  const [editingDeck, setEditingDeck] = useState(false);
  return (
    <Action 
      state={editingDeck} 
      setState={setEditingDeck} 
      icon={'edit'} 
      header={'Edit Deck Information:'}
    >
      <DeckForm 
        handleChange={handleChange}
        handleSubmit={
          async (event) => {
            await handleSubmit(event, 'UPDATE_DECK');
            setEditingDeck(false);
          }
        }
        handleCancel={() => setEditingDeck(false)}
        state={state}
        // styles={styles}
      >
        <Category
          placeholder={"Add a Category"}
          handleChange={handleChange}
          categoryState={state.categories}
        />
      </DeckForm>
    </Action>
  )
};

export const EditCard = ({ state, card, handleChange, handleSubmit }) => {
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
        handleSubmit={
          async (event) => {
            await handleSubmit(event, 'UPDATE_CARD', card._id);
            setEditingCard(false);
          }
        }
        handleCancel={() => setEditingCard(false)}
      />
    </Action>
  )
}
export const Delete = ({ header, action, stateId }) => {
  const [removeCard, {}] = useMutation(REMOVE_CARD);
  const [removeDeck, {}] = useMutation(REMOVE_DECK);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleConfirm = async (action, stateId) => {
    try {
      if (action === 'REMOVE_DECK') {

      };
      if (action === 'REMOVE_CARD') {
        
      }
    } catch (error) {
      console.log(error);
    }
  }
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