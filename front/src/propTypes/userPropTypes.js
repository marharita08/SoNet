import PropTypes from "prop-types";

export const usersPopoverPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        avatar: PropTypes.string
    })
);

export const userAuthPropTypes = PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
});
