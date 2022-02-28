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
    handleClick: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool.isRequired
}
