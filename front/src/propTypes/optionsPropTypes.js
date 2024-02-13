import PropTypes from "prop-types";

export const optionPropTypes = PropTypes.shape({
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
});

export const optionsPropTypes = PropTypes.arrayOf(optionPropTypes);
