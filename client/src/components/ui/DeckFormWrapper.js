import classes from "./DeckFormWrapper.module.css";

function DeckFormWrapper(props) {
  return (
    <div id="card" className={classes.deckForm__wrapper}>
      {props.children}
    </div>
  );
}

export default DeckFormWrapper;
