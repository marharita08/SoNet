import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import {HeaderContainer} from './containers/header';
import {ArticlesContainer} from './containers/articles';
import {ArticleContainer} from './containers/article';
import {AddArticleContainer} from './containers/addArticle';
import {ProfileContainer} from './containers/profile';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
      <>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <HeaderContainer/>
            <AddArticleContainer/>
            <Routes>
              <Route path="/" element={<ArticlesContainer/>}/>
              <Route path="/article/:id" element={<ArticleContainer/>}/>
              <Route path="/profile/:id" element={<ProfileContainer/>} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </>
  );
}

export default App;
