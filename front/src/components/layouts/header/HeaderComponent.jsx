import React from "react";
import PropTypes from "prop-types";

import HeaderButtons from "./HeaderButtons";
import HeaderUser from "./HeaderUser";
import HeaderLogo from "./HeaderLogo";
import {useStyles} from "./style";
import {userCardPropTypes} from "../../../propTypes/userPropTypes";

const Header = ({ user, actions, flags}) => {

  const {handleAddArticle, handleLogout} = actions;
  const {authenticated, isAdmin} = flags;
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <HeaderLogo/>
      {
        authenticated &&
        <>
          <HeaderButtons
            handleAddArticle={handleAddArticle}
            isAdmin={isAdmin}
          />
          <HeaderUser
            handleLogout={handleLogout}
            user={user}
          />
        </>
      }
    </header>
  );
};

Header.propTypes = {
  user: userCardPropTypes,
  actions: PropTypes.shape({
    handleAddArticle: PropTypes.func,
    handleLogout: PropTypes.func,
  }),
  flags: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool,
  })
};

export default Header;
