import React, {useContext} from "react";
import {useMutation} from "react-query";
import authContext from "../../../context/authContext";
import ErrorBoundary from "../../../components/ErrorBoundary";
import Header from "../../../components/layouts/header/HeaderComponent";
import {apiLogout} from "../../../api/authCrud";
import PropTypes from "prop-types";
import {initArticle} from "../../../config/initValues";

const HeaderContainer = ({
    setArticleContext,
    unsetAuthContext
}) => {
    const {authenticated, user, refreshToken, isAdmin} = useContext(authContext);

    let handleAddArticle;
    let handleLogout;

    if (authenticated) {
        handleAddArticle = () => {
            setArticleContext(initArticle(user.user_id));
        };

        const {mutate} = useMutation(apiLogout);

        handleLogout = () => {
            unsetAuthContext();
            mutate({refreshToken});
        };
    }

    return (
        <ErrorBoundary>
            <Header
                handleAddArticle={handleAddArticle}
                user={user}
                authenticated={authenticated}
                handleLogout={handleLogout}
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
