import PropTypes from "prop-types";

export let AddArticlePropTypes = {
    visibilities: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
    })),
    article: PropTypes.shape({
        text: PropTypes.string.isRequired,
        visibility: PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
        }),
    }),
    addArticle: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    image: PropTypes.object,
    setCropper: PropTypes.func.isRequired,
    cropImage: PropTypes.func.isRequired,
    croppedImage: PropTypes.object,
    deleteImage: PropTypes.func.isRequired,
    message: PropTypes.string,
    visibilitiesFetching: PropTypes.bool
}
