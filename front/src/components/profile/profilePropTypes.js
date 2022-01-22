import PropTypes from "prop-types";

export let ProfilePropTypes = {
    user: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        name_visibility_id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        email_visibility_id: PropTypes.number.isRequired,
        phone: PropTypes.string.isRequired,
        phone_visibility_id: PropTypes.number.isRequired,
        university_id: PropTypes.number,
        university_visibility_id: PropTypes.number.isRequired,
        avatar: PropTypes.string.isRequired
    }),
    universities: PropTypes.arrayOf(PropTypes.shape({
        university_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    visibilities: PropTypes.arrayOf(PropTypes.shape({
        visibility_id: PropTypes.number.isRequired,
        visibility: PropTypes.string.isRequired
    }))
}
