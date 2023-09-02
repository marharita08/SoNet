import PropTypes from "prop-types";

export const usersPopoverPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        avatar: PropTypes.string
    })
);
