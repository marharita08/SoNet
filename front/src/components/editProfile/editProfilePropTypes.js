import PropTypes from "prop-types";

export let EditProfilePropTypes = {
    user: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        email_visibility: PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired
        }),
        phone: PropTypes.string,
        phone_visibility: PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired
        }),
        university: PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired
        }),
        university_visibility: PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired
        }),
        avatar: PropTypes.string.isRequired
    }),
    universities: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
    })),
    visibilities: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
    })),
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    image: PropTypes.object,
    croppedImage: PropTypes.object,
    deleteImage: PropTypes.func.isRequired,
    cropImage: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setCropper: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    message: PropTypes.string
}
