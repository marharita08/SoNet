import PropTypes from "prop-types";
import {articlePropTypes} from "../../../propTypes/articlePropTypes";

export const articleHeaderPropTypes = {
  article: articlePropTypes.isRequired,
  flags: PropTypes.shape({
    isCurrentUser: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired
  }),
  actions: PropTypes.shape({
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  })
};
