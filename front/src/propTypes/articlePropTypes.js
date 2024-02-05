import PropTypes from "prop-types";
import {optionPropTypes} from "./optionsPropTypes";

export const articleAddEditPropTypes = PropTypes.shape({
  text: PropTypes.string.isRequired,
  visibility: optionPropTypes,
});

export const articlePropTypes = PropTypes.shape({
  article_id: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  text: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  image: PropTypes.string,
});

export const articlesPropTypes = PropTypes.arrayOf(articlePropTypes);

