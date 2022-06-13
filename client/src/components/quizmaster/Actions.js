import React, { useState } from "react";
import { Modal, Icon, Button } from 'semantic-ui-react';

export const Action = ({ state, setState, name, header, children }) => (
  <Modal 
    onClose={() => setState(false)}
    onOpen={() => setState(true)}
    open={state}
    trigger={<Icon name={name} />}
  >
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>
      {children}
    </Modal.Content>
  </Modal>
);

export const ConfirmDelete = ({ handleConfirm, handleCancel }) => (
  <>
    <Button onClick={handleConfirm}>Confirm</Button>
    <Button onClick={handleCancel}>Cancel</Button>
  </>
)