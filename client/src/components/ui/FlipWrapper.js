import classes from "./FlipWrapper.module.css";

function FlipWrapper(props) {
  return (
    <div id="flip" className={classes.flip__wrapper}>
      {props.children}
    </div>
  );
}

export default FlipWrapper;
