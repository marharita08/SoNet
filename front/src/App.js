import React, {useContext, useState} from "react";
import {
  BrowserRouter,
  Routes,
  Route, Navigate
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

import HeaderContainer from './containers/header';
import ArticlesContainer from './containers/articles';
import ArticleContainer from './containers/article';
import AddArticleContainer from './containers/addArticle';
import ProfileContainer from './containers/profile';
import AuthContainer from "./containers/auth";
import AlertContainer from "./containers/alert";
import authContext from './context/authContext';
import articleContext from "./context/articleContext";
import './App.css';

const queryClient = new QueryClient();

function App() {
  const authenticationContext = JSON.parse(window.localStorage.getItem('context')) || useContext(authContext);
  const [articleModalContext, setArticleModalContext] = useState(useContext(articleContext));
  const {openModal} = articleModalContext;
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [alertMessage, setAlertMessage] = useState(window.localStorage.getItem('alertMessage'));
  const alertSeverity = window.localStorage.getItem('alertSeverity');
  const { authenticated } = authenticationContext;

  const handleClose = () => {
    window.localStorage.setItem('alertMessage', undefined)
    setAlertMessage(undefined);
  }

  const setAuthContext = (data) => {
    window.localStorage.setItem('context', JSON.stringify(data));
    window.location.reload();
  }

  const unsetAuthContext = () => {
    window.localStorage.removeItem('context');
  }

  const setArticleContext = (data) => {
    setArticleModalContext(data);
  }

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
                  handleClose={handleClose}
                  alertSeverity={alertSeverity}
              />
              <Routes>
                <Route path="/" element={authenticated ? <Navigate to={'/articles'}/> : <Navigate to={'/auth'}/>}/>
                <Route path="/article/:id"
                       element={authenticated ? <ArticleContainer
                           setArticleContext={setArticleContext}
                           commentsExpanded={commentsExpanded}
                           setCommentsExpanded={setCommentsExpanded}
                      /> : <Navigate to={'/auth'}/>}
                />
                <Route
                    path="/profile/:id"
                    element={authenticated ? <ProfileContainer
                    /> : <Navigate to={'/auth'}/>}
                />
                <Route
                    path="/auth"
                    element={!authenticated ? <AuthContainer
                        setAuthContext={setAuthContext}
                    /> : <Navigate to={'/articles'}/>}
                />
                <Route path="/articles"
                       element={authenticated ? <ArticlesContainer
                           setArticleContext={setArticleContext}
                           commentsExpanded={commentsExpanded}
                           setCommentsExpanded={setCommentsExpanded}
                       /> : <Navigate to={'/auth'}/>}
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
