import React from 'react';
import dateFormat from "dateformat";

import Article from '../../components/article';
import {useParams} from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";

export function ArticleContainer() {
    let {id} = useParams();
    const date = dateFormat(new Date(), "dd.mm.yyyy HH:MM:ss");
    const article = {
        id: parseInt(id),
        user: {
            id: 1,
            username: "username",
            avatar: "/images/user.png"
        },
        text: "text " + id,
        createdAt: date.toString(),
        likes: 153,
        comments: 15
    };
    return (
        <ErrorBoundary>
            <Article article={article}/>
        </ErrorBoundary>
    );
}
