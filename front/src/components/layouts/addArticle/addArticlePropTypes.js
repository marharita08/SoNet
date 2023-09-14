import PropTypes from "prop-types";
import {addArticleContentPropTypes, addArticleContentDefaultProps} from "./addArticleContentPropTypes";

export const addArticlePropTypes = {
    ...addArticleContentPropTypes,
    isAdd: PropTypes.bool.isRequired,
    handleModalClose: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
};

export const addArticleDefaultProps = {
    ...addArticleContentDefaultProps,
    isLoading: false,
    errorMessage: undefined
};
