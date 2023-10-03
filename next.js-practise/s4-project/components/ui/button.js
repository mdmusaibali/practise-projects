import Link from "next/link";
import React from "react";
import classes from "./button.module.css";

function Button({ children, link, onClick }) {
  if (link)
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  else
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
}

export default Button;
