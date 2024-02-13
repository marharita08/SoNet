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
import ProfilePageContainer from "./containers/pages/profilePage/ProfilePageContainer";
import AuthPageContainer from "./containers/pages/authPage/AuthPageContainer";
import authContext from "./context/authContext";
import articleContext from "./context/articleContext";
import ArticlePageContainer from "./containers/pages/articlePage/ArticlePageContainer";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import GuestRoute from "./components/routes/GuestRoute";
import AdminRoute from "./components/routes/AdminRoute";
import {useStyles} from "./components/style";
import SNAlert from "./components/atoms/alert/SNAlert";
import handleResponseContext from "./context/handleResponseContext";
import {initAlertState} from "./config/initValues";
import ResetPasswordPageContainer from "./containers/pages/restorePasswordPage/ResetPasswordPageContainer";
import NewPasswordPageContainer from "./containers/pages/newPasswordPage/NewPasswordPageContainer";

const queryClient = new QueryClient();

function App() {
  const classes = useStyles();
  const authInitialState = JSON.parse(window.localStorage.getItem("context")) || useContext(authContext);
  const [authenticationContext, setAuthenticationContext] = useState(authInitialState);
  const [articleModalContext, setArticleModalContext] = useState(useContext(articleContext));
  const {isModalOpen: isAddOrEditArticleModalOpen} = articleModalContext;
  const [alertState, setAlertState] = useState(initAlertState);
  const {authenticated} = authenticationContext;
  const [articles, setArticles] = useState([]);
  const [responseHandler, setResponseHandler] = useState(useContext(handleResponseContext));

  const handleAlertClose = () => {
    setAlertState(initAlertState);
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

  useEffect(() => {
    setResponseHandler({
      handleError: (err) => {
        setAlertState({
          message: err.response.data.message,
          severity: "error"
        });
      },
      handleSuccess: (res) => {
        setAlertState({
          message: res.data.message,
          severity: "success"
        });
      },
      showErrorAlert: (message) => {
        setAlertState({
          message,
          severity: "error"
        });
      },
      showSuccessAlert: (message) => {
        setAlertState({
          message,
          severity: "success"
        });
      }
    });
  }, [setAlertState]);

  return (
    <>
      <handleResponseContext.Provider value={responseHandler}>
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
                  <SNAlert
                    message={alertState.message}
                    handleClose={handleAlertClose}
                    severity={alertState.severity}
                  />
                  <Routes>
                    <Route element={<ProtectedRoute/>}>
                      <Route
                        path="/"
                        element={
                          <ArticlesPageContainer
                            setArticleContext={setArticleContext}
                            param="news"
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
                            articles={articles}
                            setArticles={setArticles}
                          />
                        }
                      />
                      <Route
                        path="/profile/:id"
                        element={
                          <ProfilePageContainer/>
                        }
                      />
                    </Route>
                    <Route element={<GuestRoute/>}>
                      <Route
                        path="/auth"
                        element={
                          <AuthPageContainer
                            setAuthContext={setAuthContext}
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
                            articles={articles}
                            setArticles={setArticles}
                          />
                        }
                      />
                    </Route>
                    <Route
                      path={"/reset-password"}
                      element={<ResetPasswordPageContainer/>}
                    />
                    <Route
                      path={"/new-password/:token"}
                      element={<NewPasswordPageContainer/>}
                    />
                  </Routes>
                </div>
              </BrowserRouter>
            </QueryClientProvider>
          </articleContext.Provider>
        </authContext.Provider>
      </handleResponseContext.Provider>
    </>
  );
}

export default App;
