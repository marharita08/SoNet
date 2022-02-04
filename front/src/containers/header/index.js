import React, {useState} from "react";

import './header.css';
import {Link} from "react-router-dom";
import {useBetween} from "use-between";

export const modalState = () => {
    const [open, setOpen] = useState(false);
    return {
        open, setOpen
    }
}

export function HeaderContainer() {
    const {setOpen} = useBetween(modalState);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <header>
            <Link to={"/"}>
                <button className={"left"}>Articles</button>
            </Link>

                <button onClick={handleClickOpen}>Add article</button>

            <Link to={"/profile/1"}>
                <button className={"right"}>Profile</button>
            </Link>
        </header>
    );
}
