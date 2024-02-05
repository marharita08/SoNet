import PropTypes from "prop-types";
import {optionsPropTypes} from "../../../propTypes/optionsPropTypes";
import {articleAddEditPropTypes} from "../../../propTypes/articlePropTypes";

export const addOrEditArticleContentPropTypes = {
    visibilities: optionsPropTypes,
    article: articleAddEditPropTypes,
    handleAddImage: PropTypes.func.isRequired,
    image: PropTypes.string,
    setCropper: PropTypes.func.isRequired,
    handleCropImage: PropTypes.func.isRequired,
    croppedImage: PropTypes.object,
    handleDeleteImage: PropTypes.func.isRequired,
    isVisibilitiesFetching: PropTypes.bool,
}

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
}
