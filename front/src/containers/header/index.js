import React from "react";

import './header.css';
import {Link} from "react-router-dom";


export function HeaderContainer({setOpenModal, setAddArticle, setArticle}) {

    const handleClickOpen = () => {
        setOpenModal(true);
        setAddArticle(true);
        setArticle({
            text: "",
            user_id: 1,
            visibility: {
                value: 1,
                label: "All",
            }
        })
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
