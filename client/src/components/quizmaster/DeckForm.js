import React, { useState } from "react";
import { Form, Button, Checkbox, Label } from "semantic-ui-react";

const DeckForm = ({ state, handleChange, handleSubmit, handleCancel, children, styles }) => {
  const [paywall, setPaywall] = useState(true);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Label className={styles.label}>Title:</Label>
        <Form.Input
          placeholder="Title"
          name="title"
          type="text"
          onChange={handleChange}
          value={state.title}
        />
      </Form.Field>

      <Form.Field>
        <Label className={styles.label}>Categories:</Label>
        {children}
      </Form.Field>

      <Form.Field>
        <Label className={styles.label}>Description:</Label>
        <Form.Input
          placeholder="Description"
          name="description"
          type="text"
          onChange={handleChange}
          value={state.description}
        />
      </Form.Field>

      <Form.Field>
        {!paywall ? <></> : (
          <>
            <div>
              <Label className={styles.label}>Set Price:</Label>
            </div>
            <Form.Input
              className={styles.price}
              placeholder="$0.99"
              name="price"
              type="text"
              onChange={handleChange}
              value={state.price}
            />
          </>
        )}
          <Checkbox
            id="text"
            label="Make Deck Public"
            className={styles.checkbox}
            onChange={() => setPaywall(!paywall)}
          />
      </Form.Field>
      <Form.Field>
        <Button inverted type="submit" color="teal" size="big">
          Save
        </Button>
        {
          !handleCancel ? <></> : (
          <Button inverted type="button" color="teal" size="big" onClick={handleCancel}>
            Cancel
          </Button>
          )
        }
      </Form.Field>
    </Form>
  )
};
export default DeckForm;