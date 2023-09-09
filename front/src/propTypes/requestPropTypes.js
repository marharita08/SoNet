import PropTypes from "prop-types";

export const requestsPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
        request_id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
    })
)
