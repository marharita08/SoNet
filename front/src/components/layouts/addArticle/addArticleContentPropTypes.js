import PropTypes from "prop-types";
import {visibilitiesPropTypes} from "../../../propTypes/visibilitiesPropTypes";
import {articleAddEditPropTypes} from "../../../propTypes/articlePropTypes";

export const addArticleContentPropTypes = {
    visibilities: visibilitiesPropTypes,
    article: articleAddEditPropTypes,
    handleAddImage: PropTypes.func.isRequired,
    image: PropTypes.string,
    setCropper: PropTypes.func.isRequired,
    handleCropImage: PropTypes.func.isRequired,
    croppedImage: PropTypes.object,
    handleDeleteImage: PropTypes.func.isRequired,
    isVisibilitiesFetching: PropTypes.bool,
}

export const addArticleContentDefaultProps = {
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
