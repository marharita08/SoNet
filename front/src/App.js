import React, {useContext, useState} from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import HeaderContainer from "./containers/header";
import ArticlesContainer from "./containers/articles";
import AddArticleContainer from "./containers/addArticle";
import ProfileContainer from "./containers/profile";
import AuthContainer from "./containers/auth";
import AlertContainer from "./containers/alert";
import authContext from "./context/authContext";
import articleContext from "./context/articleContext";
import ArticleOuterContainer from "./containers/articleOuter";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import GuestRoute from "./components/routes/GuestRoute";
import AdminRoute from "./components/routes/AdminRoute";
import {useStyles} from "./components/style";

const queryClient = new QueryClient();

function App() {
    const classes = useStyles();
    const [authenticationContext, setAuthenticationContext] =
        useState(JSON.parse(window.localStorage.getItem("context")) || useContext(authContext));
    const [articleModalContext, setArticleModalContext] = useState(useContext(articleContext));
    const {openModal} = articleModalContext;
    const [alertMessage, setAlertMessage] = useState();
    const {authenticated} = authenticationContext;
    const [articles, setArticles] = useState([]);

    const handleAlertClose = () => {
        setAlertMessage(undefined);
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

    const handleError = (err) => setAlertMessage(err.response.data.message);

    return (
        <>
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
                                    authenticated && openModal &&
                                    <AddArticleContainer
                                        setArticleContext={setArticleContext}
                                        articles={articles}
                                        setArticles={setArticles}
                                    />
                                }
                                <AlertContainer
                                    alertMessage={alertMessage}
                                    handleClose={handleAlertClose}
                                />
                                <Routes>
                                    <Route element={<ProtectedRoute/>}>
                                        <Route path="/" element={
                                            <ArticlesContainer
                                                setArticleContext={setArticleContext}
                                                param="news"
                                                handleError={handleError}
                                                articles={articles}
                                                setArticles={setArticles}
                                            />
                                        }/>
                                        <Route path="/articles" element={
                                            <ArticlesContainer
                                                setArticleContext={setArticleContext}
                                                param="news"
                                                handleError={handleError}
                                                articles={articles}
                                                setArticles={setArticles}
                                            />
                                        }/>
                                        <Route path="/article/:id" element={
                                            <ArticleOuterContainer
                                                setArticleContext={setArticleContext}
                                                handleError={handleError}
                                                articles={articles}
                                                setArticles={setArticles}
                                            />
                                        }/>
                                        <Route
                                            path="/profile/:id"
                                            element={<ProfileContainer handleError={handleError}/>}
                                        />
                                    </Route>
                                    <Route element={<GuestRoute/>}>
                                        <Route
                                            path="/auth"
                                            element={<AuthContainer
                                                setAuthContext={setAuthContext}
                                                handleError={handleError}
                                            />}
                                        />
                                    </Route>
                                    <Route element={<AdminRoute/>}>
                                        <Route path="/all-articles"
                                               element={<ArticlesContainer
                                                   setArticleContext={setArticleContext}
                                                   param="all"
                                                   handleError={handleError}
                                                   articles={articles}
                                                   setArticles={setArticles}
                                               />}
                                        />
                                    </Route>
                                </Routes>
                            </div>
                        </BrowserRouter>
                    </QueryClientProvider>
                </articleContext.Provider>
            </authContext.Provider>
        </>
    );
}

export default App;
