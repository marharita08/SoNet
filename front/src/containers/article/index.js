import React from 'react';

import Article from '../../components/article';
import {useParams} from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import {useQuery} from "react-query";
import {getArticle, getComments} from "../api/articlesCrud";
import Comment from "../../components/comment";
import ReactLoading from "react-loading";

export function ArticleContainer() {
    let {id} = useParams();
    const {isFetching:articleFetching, data:articleData } = useQuery('article', () => getArticle(id));
    const {isFetching:commentsFetching, data:commentsData } = useQuery('comments', () => getComments(id));
    const articles = articleData?.data;
    const comments = commentsData?.data;

    return (
        <div>
            {(articleFetching || commentsFetching) &&
                <div align={"center"}>
                    <ReactLoading type={'balls'} color='#001a4d'/>
                </div>
            }
            {articles?.map((article) =>
                <div key={article.article_id + article.name}>
                    <ErrorBoundary>
                        <Article article={article}/>
                    </ErrorBoundary>
                    {comments?.map((comment) =>
                        <ErrorBoundary key={comment.path + comment.name}>
                            <Comment comment={comment}/>
                        </ErrorBoundary>
                    )}
                </div>
            )}
        </div>
    );
}
