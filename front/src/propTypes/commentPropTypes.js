import PropTypes from "prop-types";

export const commentAddPropTypes = PropTypes.shape({
    level: PropTypes.number.isRequired,
    to: PropTypes.string,
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    parent_id: PropTypes.number,
});

