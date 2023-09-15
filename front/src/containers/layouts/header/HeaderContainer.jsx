import React, {useContext} from "react";
import {useMutation} from "react-query";
import authContext from "../../../context/authContext";
import ErrorBoundary from "../../../components/ErrorBoundary";
import Header from "../../../components/layouts/header/HeaderComponent";
import {apiLogout} from "../../../api/auth";
import PropTypes from "prop-types";

const HeaderContainer = ({
    setArticleContext,
    unsetAuthContext
}) => {
    const {authenticated, user, refreshToken, isAdmin} = useContext(authContext);

    let handleAddArticle;
    let handleLogout;

    if (authenticated) {
        handleAddArticle = () => {
            setArticleContext({
                isModalOpen: true,
                isAdd: true,
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
