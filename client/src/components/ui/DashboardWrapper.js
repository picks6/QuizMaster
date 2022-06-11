import classes from "./DashboardWrapper.module.css";

function DashboardWrapper(props) {
  return (
    <div id="dashboard" className={classes.dashboard}>
      {props.children}
    </div>
  );
}

export default DashboardWrapper;
