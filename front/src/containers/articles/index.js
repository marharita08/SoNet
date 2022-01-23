import React from 'react';
import { useQuery } from 'react-query';
import {getArticles} from "../api/articlesCrud";

import Article from '../../components/article';
import ErrorBoundary from "../../components/ErrorBoundary";
import {Link} from "react-router-dom";
import ReactLoading from "react-loading";


export function ArticlesContainer() {
    const {isFetching, data } = useQuery('articles', () => getArticles());
    const articles = data?.data;

    return (
        <div>
            {isFetching &&
                <div align={"center"}>
                    <ReactLoading type={'balls'} color='#001a4d'/>
                </div>
            }
            {articles?.map((article) =>
                <ErrorBoundary key={article.article_id}>
                    <Link to={"/article/" + article.article_id}>
                        <Article article={article}/>
                    </Link>
                </ErrorBoundary>
            )}
        </div>
    );
}
