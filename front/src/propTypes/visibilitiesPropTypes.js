import PropTypes from "prop-types";

export const visibilityPropTypes = PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
});

export const visibilitiesPropTypes = PropTypes.arrayOf(visibilityPropTypes);
