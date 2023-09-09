import React from "react";
import {Link} from "react-router-dom";
import {useStyles} from "./style";

const HeaderLogo = () => {

    const classes = useStyles();

    return (
        <div className={classes.logoContainer}>
            <Link to={"/"}>
                <img
                    src={"/logo.png"}
                    alt={"Social Network"}
                    className={classes.logo}
                />
            </Link>
        </div>
    );
};

export default HeaderLogo;
