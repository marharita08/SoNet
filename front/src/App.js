import React, {useState} from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import {HeaderContainer} from './containers/header';
import {ArticlesContainer} from './containers/articles';
import {ArticleContainer} from './containers/article';
import AddArticleContainer from './containers/addArticle';
import {ProfileContainer} from './containers/profile';
import {AuthContainer} from "./containers/auth";
import authContext from './context/authContext';

import './App.css';

const queryClient = new QueryClient();

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [article, setArticle] = useState();
  const [addArticle, setAddArticle] = useState(true);
  const [userData, setUserData] = useState({authenticated: false, user: {user_id: 1}, setUserData: () => {}});

  return (
      <>
        <authContext.Provider value={userData}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <HeaderContainer
                  setOpenModal={setOpenModal}
                  setArticle={setArticle}
                  setAddArticle={setAddArticle}
              />
              <AddArticleContainer
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  article={article}
                  addArticle={addArticle}
              />
              <Routes>
                <Route path="/"
                      element={<ArticlesContainer
                          setOpenModal={setOpenModal}
                          commentsExpanded={commentsExpanded}
                          setCommentsExpanded={setCommentsExpanded}
                          setArticle={setArticle}
                          setAddArticle={setAddArticle}
                      />}
                />
                <Route path="/article/:id"
                       element={<ArticleContainer
                           setOpenModal={setOpenModal}
                           commentsExpanded={commentsExpanded}
                           setCommentsExpanded={setCommentsExpanded}
                           setArticle={setArticle}
                           setAddArticle={setAddArticle}
                      />}
                />
                <Route path="/profile/:id" element={<ProfileContainer/>} />
                <Route path="/auth" element={<AuthContainer/>}/>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </authContext.Provider>
      </>
  );
}

export default App;
