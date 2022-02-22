import PropTypes from "prop-types";

export let ProfilePropTypes = {
    user: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        name_visibility: PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired
        }),
        email: PropTypes.string.isRequired,
        email_visibility: PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired
        }),
        phone: PropTypes.string.isRequired,
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
}
