import React from "react";

import './header.css';
import {Link} from "react-router-dom";

export function HeaderContainer() {

    return (
        <header>
            <Link to={"/"}>
                <button className={"left"}>Articles</button>
            </Link>
            <Link to={"/article"}>
                <button>Add article</button>
            </Link>
            <Link to={"/profile/1"}>
                <button className={"right"}>Profile</button>
            </Link>
        </header>
    );
}
