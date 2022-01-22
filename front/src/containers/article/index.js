import React from 'react';

import Article from '../../components/article';
import {useParams} from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import {useQuery} from "react-query";
import {getArticle, getComments} from "./api/crud";
import Comment from "../../components/comment";
import ReactLoading from "react-loading";

export function ArticleContainer() {
    let {id} = useParams();
    const {isFetching:aFetching, data:aData } = useQuery('article', () => getArticle(id));
    const {isFetching:cFetching, data:cData } = useQuery('comments', () => getComments(id));
    const articles = aData?.data;
    const comments = cData?.data;

    return (
        <div>
            {(aFetching || cFetching) &&
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
