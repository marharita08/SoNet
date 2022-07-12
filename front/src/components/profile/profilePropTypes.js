import PropTypes from "prop-types";

export let ProfilePropTypes = {
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
    handleClick: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    addToFriends: PropTypes.func.isRequired,
    accept: PropTypes.func.isRequired,
    deleteFromFriends: PropTypes.func.isRequired,
    isFriends: PropTypes.bool.isRequired,
    isOutgoingRequest: PropTypes.bool.isRequired,
    isIncomingRequest: PropTypes.bool.isRequired,
    isNotFriends: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
}
