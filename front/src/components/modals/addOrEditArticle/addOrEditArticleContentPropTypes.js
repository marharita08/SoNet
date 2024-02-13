import PropTypes from "prop-types";
import {optionsPropTypes} from "../../../propTypes/optionsPropTypes";
import {articleAddEditPropTypes} from "../../../propTypes/articlePropTypes";

export const addOrEditArticleContentPropTypes = {
  visibilities: optionsPropTypes,
  article: articleAddEditPropTypes,
  image: PropTypes.string,
  croppedImage: PropTypes.string,
  isVisibilitiesFetching: PropTypes.bool,
  actions: PropTypes.shape({
    handleAddImage: PropTypes.func.isRequired,
    setCropper: PropTypes.func.isRequired,
    handleCropImage: PropTypes.func.isRequired,
    handleDeleteImage: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired
  })
};

export const addOrEditArticleContentDefaultProps = {
  visibilities: [],
  article: {
    text: "",
    visibility: {
      value: 1,
      label: "All"
    }
  },
  image: undefined,
  croppedImage: undefined,
  isVisibilitiesFetching: false
};
