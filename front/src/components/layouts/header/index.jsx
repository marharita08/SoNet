import React from "react";
import PropTypes from "prop-types";
import HeaderButtons from "./HeaderButtons";
import HeaderUser from "./HeaderUser";
import HeaderLogo from "./HeaderLogo";
import {useStyles} from "./style";
import {userCardPropTypes} from "../../../propTypes/userPropTypes";

const Header = ({handleClickOpen, user, authenticated, logout, isAdmin}) => {

    const classes = useStyles();

    return (
        <header className={classes.header}>
            <HeaderLogo/>
            <HeaderButtons
                handleClickOpen={handleClickOpen}
                isAdmin={isAdmin}
                authenticated={authenticated}
            />
            <HeaderUser
                logout={logout}
                authenticated={authenticated}
                user={user}
            />
        </header>
    );
};

Header.propTypes = {
    handleClickOpen: PropTypes.func,
    user: userCardPropTypes,
    authenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func,
    isAdmin: PropTypes.bool,
};

export default Header;
