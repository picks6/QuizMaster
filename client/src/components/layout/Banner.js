import React from "react";
import classes from "./Banner.module.css";
import Title from "./Title";

function Banner() {
  return (
    <section className={`${classes.banner__block} ${classes.hero__image}`}>
      <Title />
    </section>
  );
}

export default Banner;
