import React, {useContext} from "react";

import Article from "../../components/article";
import {useParams} from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import {useQuery} from "react-query";
import {getArticle, getComments} from "../api/articlesCrud";
import Comment from "../../components/comment";
import ReactLoading from "react-loading";
import {Collapse} from "@mui/material";
import authContext from "../../context/authContext";


export function ArticleContainer({setOpenModal, commentsExpanded, setCommentsExpanded, setArticle, setAddArticle}) {
    let {id} = useParams();
    const {isFetching:articleFetching, data:articleData } = useQuery('article', () => getArticle(id));
    const {isFetching:commentsFetching, data:commentsData } = useQuery('comments', () => getComments(id));
    const articles = articleData?.data;
    const comments = commentsData?.data;
    const { user:{user_id} } = useContext(authContext);

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
            {(articleFetching || commentsFetching) &&
                <div align={"center"}>
                    <ReactLoading type={'balls'} color='#001a4d'/>
                </div>
            }
            {articles?.map((article) =>
                <div>
                    <ErrorBoundary>
                        <Article
                            article={article}
                            commentsExpanded={commentsExpanded}
                            handleEdit={handleEdit}
                            handleExpandClick={handleExpandClick}
                            handleLikeClick={handleLikeClick}
                            isCurrentUser={article.user_id === user_id}
                        />
                    </ErrorBoundary>
                    <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
                        {comments?.map((comment) =>
                            <ErrorBoundary key={comment.path + comment.name}>
                                <Comment comment={comment}/>
                            </ErrorBoundary>
                        )}
                    </Collapse>
                </div>
            )}
        </div>
    );
}
