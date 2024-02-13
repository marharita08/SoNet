import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {currentRequestPropTypes} from "../../../propTypes/currentRequestPropTypes";

export let ProfilePropTypes = {
  user: userProfilePropTypes,
  actions: PropTypes.shape({
    handleEdit: PropTypes.func.isRequired,
    handleAddToFriends: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleDeleteFromFriends: PropTypes.func.isRequired,
  }),
  flags: PropTypes.shape({
    isCurrentUser: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }),
  loading: PropTypes.shape({
    isLoading: PropTypes.bool,
    requestFetching: PropTypes.bool,
  }),
  currentRequest: currentRequestPropTypes,
};
