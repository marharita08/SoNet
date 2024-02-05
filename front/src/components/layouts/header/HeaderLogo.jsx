import React from "react";
import {useStyles} from "./style";
import LinkToRoot from "../../atoms/links/LinkToRoot";

const HeaderLogo = () => {

  const classes = useStyles();

  return (
    <div className={classes.logoContainer}>
      <LinkToRoot
        content={
          <img
            src={"/logo.png"}
            alt={"Social Network"}
            className={classes.logo}
          />
        }
      />
    </div>
  );
};

export default HeaderLogo;
