import React, {useContext} from "react";
import {useMutation} from "react-query";
import authContext from "../../context/authContext";
import ErrorBoundary from "../../components/ErrorBoundary";
import Header from "../../components/layouts/header";
import {apiLogout} from "../../api/auth";
import PropTypes from "prop-types";
import "../../components/layouts/header/header.css";

const HeaderContainer = ({
    setArticleContext,
    unsetAuthContext
}) => {
    const {authenticated, user, refreshToken, isAdmin} = useContext(authContext);

    let handleClickOpen;
    let logout;

    if (authenticated) {
        handleClickOpen = () => {
            setArticleContext({
                openModal: true,
                addArticle: true,
                article: {
                    text: "",
                    user_id: user.user_id,
                    visibility: {
                        value: 1,
                        label: "All",
                    }
                }
            });
        };

        const {mutate} = useMutation(apiLogout);

        logout = () => {
            unsetAuthContext();
            mutate({refreshToken});
        };
    }

    return (
        <ErrorBoundary>
            <Header
                handleClickOpen={handleClickOpen}
                user={user}
                authenticated={authenticated}
                logout={logout}
                isAdmin={isAdmin}
            />
        </ErrorBoundary>
    );
};

HeaderContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    unsetAuthContext: PropTypes.func.isRequired,
};

export default HeaderContainer;
