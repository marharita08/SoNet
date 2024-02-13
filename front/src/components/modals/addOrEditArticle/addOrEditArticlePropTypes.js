import PropTypes from "prop-types";
import {
  addOrEditArticleContentPropTypes,
  addOrEditArticleContentDefaultProps
} from "./addOrEditArticleContentPropTypes";

const {actions, isVisibilitiesFetching, ...rest} = addOrEditArticleContentPropTypes;
const {setFieldValue, ...restActions} = actions
const {isVisibilitiesFetching: _, ...restDefaults} = addOrEditArticleContentDefaultProps;

export const addOrEditArticlePropTypes = {
  actions: PropTypes.shape({
    ...restActions,
    handleModalClose: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
  }),
  flags: PropTypes.shape({
    isVisibilitiesFetching,
    isAdd: PropTypes.bool,
    isLoading: PropTypes.bool,
  }),
  errorMessage: PropTypes.string,
  ...rest,
};

export const addOrEditArticleDefaultProps = {
  ...restDefaults,
  isLoading: false,
  errorMessage: undefined
};
