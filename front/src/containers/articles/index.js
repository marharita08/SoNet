import React from "react";
import { useQuery } from 'react-query';
import {getArticles} from "../api/articlesCrud";

import Article from "../../components/article";
import ErrorBoundary from "../../components/ErrorBoundary";
import {Link} from "react-router-dom";
import ReactLoading from "react-loading";



export function ArticlesContainer({setOpenModal, commentsExpanded, setCommentsExpanded, setArticle, setAddArticle}) {
    const {isFetching, data } = useQuery('articles', () => getArticles());
    const articles = data?.data;
    setCommentsExpanded(false);

    const handleExpandClick = () => {
        setCommentsExpanded(!commentsExpanded);
    };

    const handleLikeClick = (event) => {
        event.preventDefault();
    };

    const handleEdit = (article) => {
        setArticle(article);
        setAddArticle(false);
        setOpenModal(true);
    }

    return (
        <div>
            {isFetching &&
                <div align={"center"}>
                    <ReactLoading type={'balls'} color='#001a4d'/>
                </div>
            }
            {articles?.map((article) =>
                <ErrorBoundary key={article.article_id}>
                    <Link to={`/article/${article.article_id}`}>
                        <Article
                            article={article}
                            commentsExpanded={commentsExpanded}
                            handleEdit={handleEdit}
                            handleExpandClick={handleExpandClick}
                            handleLikeClick={handleLikeClick}
                        />
                    </Link>
                </ErrorBoundary>
            )}
        </div>
    );
}
