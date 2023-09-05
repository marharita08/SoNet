import PropTypes from "prop-types";
import {addArticleContentPropTypes, addArticleContentDefaultProps} from "./addArticleContentPropTypes";

export const addArticlePropTypes = {
    ...addArticleContentPropTypes,
    addArticle: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
};

export const addArticleDefaultProps = {
    ...addArticleContentDefaultProps,
    isLoading: false,
    message: undefined
};
