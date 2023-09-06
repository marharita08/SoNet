import PropTypes from "prop-types";

export const currentRequestPropTypes = PropTypes.shape({
    request_id: PropTypes.number,
    user_id: PropTypes.number,
    name: PropTypes.string,
    avatar: PropTypes.string,
    is_not_friends: PropTypes.bool,
    is_friends: PropTypes.bool,
    is_incoming_request: PropTypes.bool,
    is_outgoing_request: PropTypes.bool
});
