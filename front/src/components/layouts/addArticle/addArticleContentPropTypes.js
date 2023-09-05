import PropTypes from "prop-types";
import {visibilitiesPropTypes} from "../../../propTypes/visibilitiesPropTypes";
import {articleAddEditPropTypes} from "../../../propTypes/articlePropTypes";

export const addArticleContentPropTypes = {
    visibilities: visibilitiesPropTypes,
    article: articleAddEditPropTypes,
    handleChange: PropTypes.func.isRequired,
    image: PropTypes.string,
    setCropper: PropTypes.func.isRequired,
    cropImage: PropTypes.func.isRequired,
    croppedImage: PropTypes.object,
    deleteImage: PropTypes.func.isRequired,
    visibilitiesFetching: PropTypes.bool,
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
    visibilitiesFetching: false
}
