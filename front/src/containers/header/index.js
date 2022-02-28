import React, {useContext} from "react";

import './header.css';
import authContext from "../../context/authContext";
import ErrorBoundary from "../../components/ErrorBoundary";
import Header from "../../components/header"


export function HeaderContainer({setOpenModal, setAddArticle, setArticle}) {
    const { user:{user_id} } = useContext(authContext);

    const handleClickOpen = () => {
        setOpenModal(true);
        setAddArticle(true);
        setArticle({
            text: "",
            user_id,
            visibility: {
                value: 1,
                label: "All",
            }
        })
    };

    return (
        <ErrorBoundary>
            <Header handleClickOpen={handleClickOpen} user_id={user_id}/>
        </ErrorBoundary>
    );
}
