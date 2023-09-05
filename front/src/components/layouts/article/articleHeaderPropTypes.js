import PropTypes from "prop-types";
import {articlePropTypes} from "../../../propTypes/articlePropTypes";

export const articleHeaderPropTypes = {
    article: articlePropTypes.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};
