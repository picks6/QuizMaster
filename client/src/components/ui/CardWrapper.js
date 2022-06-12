import classes from "./CardWrapper.module.css";

function CardWrapper(props) {
  return (
    <div id="card" className={classes.card__wrapper}>
      {props.children}
    </div>
  );
}

export default CardWrapper;
