import classes from "./SingleDeckWrapper.module.css";

function SingleDeckWrapper(props) {
  return (
    <div id="dashboard" className={classes.singleDeck}>
      {props.children}
    </div>
  );
}

export default SingleDeckWrapper;
