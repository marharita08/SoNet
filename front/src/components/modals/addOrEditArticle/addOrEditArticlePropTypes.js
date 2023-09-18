import PropTypes from "prop-types";
import {addOrEditArticleContentPropTypes, addOrEditArticleContentDefaultProps} from "./addOrEditArticleContentPropTypes";

export const addOrEditArticlePropTypes = {
    ...addOrEditArticleContentPropTypes,
    isAdd: PropTypes.bool.isRequired,
    handleModalClose: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
};

export const addOrEditArticleDefaultProps = {
    ...addOrEditArticleContentDefaultProps,
    isLoading: false,
    errorMessage: undefined
};
