import React from "react";
import PropTypes from "prop-types";
import HeaderButtons from "./HeaderButtons";
import HeaderUser from "./HeaderUser";
import HeaderLogo from "./HeaderLogo";
import {useStyles} from "./style";
import {userCardPropTypes} from "../../../propTypes/userPropTypes";

const Header = ({handleAddArticle, user, authenticated, handleLogout, isAdmin}) => {

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
  handleAddArticle: PropTypes.func,
  user: userCardPropTypes,
  authenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default Header;
