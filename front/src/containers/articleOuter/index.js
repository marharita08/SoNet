import React , {useContext} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import ReactLoading from "react-loading";
import PropTypes from 'prop-types';

import ErrorBoundary from "../../components/ErrorBoundary";
import Article from "../../containers/article";
import {getArticleByIdAndUserId} from "../../api/articlesCrud";
import authContext from "../../context/authContext";


const ArticleOuterContainer = ({setArticleContext, handleError}) => {
    let {id} = useParams();
    const { user:{user_id} } = useContext(authContext);
    const {isFetching:articleFetching, data:articleData } =
        useQuery(`article ${id}-${user_id}`, () => getArticleByIdAndUserId(id, user_id));
    const articles = articleData?.data;

    return (
        <div>
            {(articleFetching) &&
                <div align={"center"}>
                    <ReactLoading type={'balls'} color='#001a4d'/>
                </div>
            }
            {articles?.map((article) =>
                <div>
                    <ErrorBoundary>
                        <Article
                            setArticleContext={setArticleContext}
                            article={article}
                            handleError={handleError}
                        />
                    </ErrorBoundary>
                </div>
            )}
        </div>
    );
}

ArticleOuterContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
}

export default ArticleOuterContainer;
