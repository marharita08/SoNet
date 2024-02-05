import PropTypes from "prop-types";

export const commentAddPropTypes = PropTypes.shape({
  level: PropTypes.number.isRequired,
  to: PropTypes.string,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  parent_id: PropTypes.number,
});

export const commentPropTypes = PropTypes.shape({
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  to: PropTypes.string,
  commented_at: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  p_user_id: PropTypes.number,
});

