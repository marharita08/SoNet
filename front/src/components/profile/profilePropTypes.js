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
    handleEdit: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    handleAddToFriends: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleDeleteFromFriends: PropTypes.func.isRequired,
    currentRequest: PropTypes.shape({
        request_id: PropTypes.number,
        user_id: PropTypes.number,
        name: PropTypes.string,
        avatar: PropTypes.string,
        is_not_friends: PropTypes.bool,
        is_friends: PropTypes.bool,
        is_incoming_request: PropTypes.bool,
        is_outgoing_request: PropTypes.bool
    }),
    isLoading: PropTypes.bool.isRequired,
}
