import classes from "./CartWrapper.module.css";

function CartWrapper(props) {
  return <div className={classes.cart__wrapper}>{props.children}</div>;
}

export default CartWrapper;
