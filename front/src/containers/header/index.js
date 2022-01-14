import React from "react";

import './header.css';
import {Link} from "react-router-dom";

export function HeaderContainer() {

    return (
        <header>
            <Link to={"/"}>
                <button className={"articles"}>Articles</button>
            </Link>
            <Link to={"/article"}>
                <button>Add article</button>
            </Link>
            <Link to={"/profile"}>
                <button className={"profile"}>Profile</button>
            </Link>
        </header>
    );
}
