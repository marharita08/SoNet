import React from "react";
import CentredLoading from "../../atoms/loading/CentredLoading";
import LoadMoreBtn from "../../atoms/buttons/LoadMoreBtn";
import PropTypes from "prop-types";

const ArticlesPageComponent = ({
    articlesComponent,
    isArticlesFetching,
    isLoadMoreVisible,
    isLoading,
    isCountFetching,
    handleLoadMore
}) => {
    return (
        <>
            <CentredLoading isLoading={isArticlesFetching}/>
            {articlesComponent}
            {
                isLoadMoreVisible &&
                <LoadMoreBtn
                    handleLoadMore={handleLoadMore}
                    isLoading={isLoading || isCountFetching}
                />
            }
        </>
    );
};

ArticlesPageComponent.propTypes = {
    articlesComponent: PropTypes.node.isRequired,
    isArticlesFetching: PropTypes.bool,
    isLoadMoreVisible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    isCountFetching: PropTypes.bool,
    handleLoadMore: PropTypes.func.isRequired
}

export default ArticlesPageComponent;
