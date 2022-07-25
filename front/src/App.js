import React, {useContext, useState} from "react";
import {
  BrowserRouter,
  Routes,
  Route, Navigate
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

import HeaderContainer from './containers/header';
import ArticlesContainer from './containers/articles';
import AddArticleContainer from './containers/addArticle';
import ProfileContainer from './containers/profile';
import AuthContainer from "./containers/auth";
import AlertContainer from "./containers/alert";
import authContext from './context/authContext';
import articleContext from "./context/articleContext";
import './App.css';
import ArticleOuterContainer from "./containers/articleOuter";

const queryClient = new QueryClient();

function App() {
  const [authenticationContext, setAuthenticationContext] =
  useState(JSON.parse(window.localStorage.getItem('context')) || useContext(authContext));
  const [articleModalContext, setArticleModalContext] = useState(useContext(articleContext));
  const {openModal} = articleModalContext;
  const [alertMessage, setAlertMessage] = useState();
  const { authenticated, isAdmin } = authenticationContext;

  const handleAlertClose = () => {
    setAlertMessage(undefined);
  }

  const setAuthContext = (data) => {
    window.localStorage.setItem('context', JSON.stringify(data));
    setAuthenticationContext(data);
  }

  const unsetAuthContext = () => {
    window.localStorage.removeItem('context');
    setAuthenticationContext({ authenticated: false });
  }

  const setArticleContext = (data) => {
    setArticleModalContext(data);
  }

  const handleError = (err) => setAlertMessage(err.response.data.message);

  return (
      <>
        <authContext.Provider value={authenticationContext}>
          <articleContext.Provider value={articleModalContext}>
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <HeaderContainer
                  setArticleContext={setArticleContext}
                  unsetAuthContext={unsetAuthContext}
              />
              { authenticated && openModal &&
                <AddArticleContainer
                    setArticleContext={setArticleContext}
                />
              }
              <AlertContainer
                  alertMessage={alertMessage}
                  handleClose={handleAlertClose}
              />
              <Routes>
                <Route path="/" element={authenticated ? <Navigate to={'/articles'}/> : <Navigate to={'/auth'}/>}/>
                <Route path="/article/:id"
                       element={authenticated ? <ArticleOuterContainer
                           setArticleContext={setArticleContext}
                           handleError={handleError}
                      /> : <Navigate to={'/auth'}/>}
                />
                <Route
                    path="/profile/:id"
                    element={authenticated ? <ProfileContainer
                        handleError={handleError}
                    /> : <Navigate to={'/auth'}/>}
                />
                <Route
                    path="/auth"
                    element={!authenticated ? <AuthContainer
                        setAuthContext={setAuthContext}
                        handleError={handleError}
                    /> : <Navigate to={'/articles'}/>}
                />
                <Route path="/articles"
                       element={authenticated ? <ArticlesContainer
                           setArticleContext={setArticleContext}
                           param='news'
                           handleError={handleError}
                       /> : <Navigate to={'/auth'}/>}
                />
                <Route path="/all-articles"
                       element={authenticated ?
                           (isAdmin ? <ArticlesContainer
                               setArticleContext={setArticleContext}
                               param='all'
                               handleError={handleError}
                           /> : <Navigate to={'/articles'}/>)
                           : <Navigate to={'/auth'}/>}
                />
              </Routes>
            </BrowserRouter>
            </QueryClientProvider>
          </articleContext.Provider>
        </authContext.Provider>
      </>
  );
}

export default App;
