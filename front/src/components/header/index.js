
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({handleClickOpen, user_id}) => {
    return (
        <>
            <header>
                <Link to={"/"}>
                    <button className={"left"}>Articles</button>
                </Link>

                <button onClick={handleClickOpen}>Add article</button>

                <Link to={`/profile/${user_id}`}>
                    <button className={"right"}>Profile</button>
                </Link>
            </header>
        </>
    );
}

Header.propTypes = {
    handleClickOpen: PropTypes.func.isRequired,
    user_id: PropTypes.number
}

export default Header;
