import react from "react";
import classes from "./Footer.module.css";
import githubLogo from "../../assets/images/githublogo.png";
import emailLogo from "../../assets/images/email.svg";

function Footer() {
  return (
    <footer>
      <div className={classes.footer}>
        <a href="https://github.com/picks6/QuizMaster">
          <img className={classes.footer__item} src={githubLogo} alt="github" />
        </a>
        <a href="mailto:richinatl@gmail.com">
          <img
            className={classes.footer__item}
            src={emailLogo}
            alt="email link"
          />
        </a>
        <p className={`${classes.thankyou} ${classes.footer__item}`}>
          Thank you for checking us out, you are awesome!!
        </p>
      </div>
    </footer>
  );
}

export default Footer;
