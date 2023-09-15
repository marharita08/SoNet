import React, {useContext, useEffect, useState} from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import HeaderContainer from "./containers/layouts/header/HeaderContainer";
import ArticlesPageContainer from "./containers/pages/articlesPage/ArticlesPageContainer";
import AddOrEditArticleContainer from "./containers/modals/addOrEditArticle/AddOrEditArticleContainer";
import ProfileContainer from "./containers/layouts/profile";
import AuthContainer from "./containers/layouts/auth/AuthContainer";
import authContext from "./context/authContext";
import articleContext from "./context/articleContext";
import ArticlePageContainer from "./containers/pages/articlePage/ArticlePageContainer";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import GuestRoute from "./components/routes/GuestRoute";
import AdminRoute from "./components/routes/AdminRoute";
import {useStyles} from "./components/style";
import ErrorAlert from "./components/atoms/alert/ErrorAlert";
import handleErrorContext from "./context/handleErrorContext";

const queryClient = new QueryClient();

function App() {
    const classes = useStyles();
    const [authenticationContext, setAuthenticationContext] =
        useState(JSON.parse(window.localStorage.getItem("context")) || useContext(authContext));
    const [articleModalContext, setArticleModalContext] = useState(useContext(articleContext));
    const {isModalOpen: isAddOrEditArticleModalOpen} = articleModalContext;
    const [errorMessage, setErrorMessage] = useState();
    const {authenticated} = authenticationContext;
    const [articles, setArticles] = useState([]);
    const [errorHandler, setErrorHandler] = useState(useContext(handleErrorContext));

    const handleAlertClose = () => {
        setErrorMessage(undefined);
    };

    const setAuthContext = (data) => {
        window.localStorage.setItem("context", JSON.stringify(data));
        setAuthenticationContext(data);
    };

    const unsetAuthContext = () => {
        window.localStorage.removeItem("context");
        setAuthenticationContext({authenticated: false});
    };

    const setArticleContext = (data) => {
        setArticleModalContext(data);
    };

    const handleError = (err) => setErrorMessage(err.response.data.message);

    useEffect(() => {
        setErrorHandler(handleError);
    }, [handleError]);

    return (
        <>
            <handleErrorContex.Provider value={errorHandler}>
                <authContext.Provider value={authenticationContext}>
                    <articleContext.Provider value={articleModalContext}>
                        <QueryClientProvider client={queryClient}>
                            <BrowserRouter>
                                <div className={classes.root}>
                                    <HeaderContainer
                                        setArticleContext={setArticleContext}
                                        unsetAuthContext={unsetAuthContext}
                                    />
                                    {
                                        authenticated && isAddOrEditArticleModalOpen &&
                                        <AddOrEditArticleContainer
                                            setArticleContext={setArticleContext}
                                            articles={articles}
                                            setArticles={setArticles}
                                        />
                                    }
                                    <ErrorAlert
                                        message={errorMessage}
                                        handleClose={handleAlertClose}
                                    />
                                    <Routes>
                                        <Route element={<ProtectedRoute/>}>
                                            <Route
                                                path="/"
                                                element={
                                                    <ArticlesPageContainer
                                                        setArticleContext={setArticleContext}
                                                        param="news"
                                                        handleError={handleError}
                                                        articles={articles}
                                                        setArticles={setArticles}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/articles"
                                                element={
                                                    <ArticlesPageContainer
                                                        setArticleContext={setArticleContext}
                                                        param="news"
                                                        handleError={handleError}
                                                        articles={articles}
                                                        setArticles={setArticles}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/article/:id"
                                                element={
                                                    <ArticlePageContainer
                                                        setArticleContext={setArticleContext}
                                                        handleError={handleError}
                                                        articles={articles}
                                                        setArticles={setArticles}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/profile/:id"
                                                element={
                                                    <ProfileContainer handleError={handleError}/>
                                                }
                                            />
                                        </Route>
                                        <Route element={<GuestRoute/>}>
                                            <Route
                                                path="/auth"
                                                element={
                                                    <AuthContainer
                                                        setAuthContext={setAuthContext}
                                                        handleError={handleError}
                                                        setErrorMessage={setErrorMessage}
                                                    />
                                                }
                                            />
                                        </Route>
                                        <Route element={<AdminRoute/>}>
                                            <Route
                                                path="/all-articles"
                                                element={
                                                    <ArticlesPageContainer
                                                        setArticleContext={setArticleContext}
                                                        param="all"
                                                        handleError={handleError}
                                                        articles={articles}
                                                        setArticles={setArticles}
                                                    />
                                                }
                                            />
                                        </Route>
                                    </Routes>
                                </div>
                            </BrowserRouter>
                        </QueryClientProvider>
                    </articleContext.Provider>
                </authContext.Provider>
            </handleErrorContex.Provider>
        </>
    );
}

export default App;
