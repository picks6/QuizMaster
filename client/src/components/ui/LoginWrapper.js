import classes from "./LoginWrapper.module.css";

function LoginWrapper(props) {
  return (
    <div id="card" className={classes.login__wrapper}>
      {props.children}
    </div>
  );
}

export default LoginWrapper;
