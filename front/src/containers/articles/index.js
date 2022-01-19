import React from 'react';
import dateFormat from "dateformat";

import Article from '../../components/article';
import ErrorBoundary from "../../components/ErrorBoundary";
import {Link} from "react-router-dom";


export function ArticlesContainer() {
    const date = dateFormat(new Date(), "dd.mm.yyyy HH:MM:ss");
    let articles = [
        {
            id: 1,
            user: {
                id: 1,
                username: "username",
                avatar: "/images/user.png"
            },
            text: "text 1",
            createdAt: date.toString(),
            likes: 153,
            comments: 15
        },
        {
            id: 2,
            user: {
                id: 1,
                username: "username",
                avatar: "/images/user.png"
            },
            text: "text 2",
            createdAt: date.toString(),
            likes: 153,
            comments: 15
        }
    ]

    return (
        <div>
            {articles.map((article, i) =>
                <ErrorBoundary key={i}>
                    <Link to={"/article/" + article.id}>
                        <Article article={article}/>
                    </Link>
                </ErrorBoundary>
            )}
        </div>
    );
}
