import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {HeaderContainer} from './containers/header';
import {ArticlesContainer} from './containers/articles';
import {ArticleContainer} from './containers/article';
import {AddArticleContainer} from './containers/addArticle';
import {ProfileContainer} from './containers/profile';
import {UserContainer} from './containers/user';

import './App.css';

function App() {
  return (
      <>
        <BrowserRouter>
          <HeaderContainer/>
          <Routes>
            <Route path="/" element={<ArticlesContainer/>}/>
            <Route path="/article/:id" element={<ArticleContainer/>}/>
            <Route path="/article" element={<AddArticleContainer/>}/>
            <Route path="/profile/:id" element={<ProfileContainer/>} />
            <Route path="/user" element={<UserContainer/>} />
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
