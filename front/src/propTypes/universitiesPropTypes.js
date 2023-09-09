import PropTypes from "prop-types";

export const universityPropTypes = PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
})

export const universitiesPropTypes = PropTypes.arrayOf(universityPropTypes);
