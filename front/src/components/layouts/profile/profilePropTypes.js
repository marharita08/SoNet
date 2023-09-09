import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {currentRequestPropTypes} from "../../../propTypes/currentRequestPropTypes";

export let ProfilePropTypes = {
    user: userProfilePropTypes,
    handleEdit: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool,
    isAdmin: PropTypes.bool,
    handleAddToFriends: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleDeleteFromFriends: PropTypes.func.isRequired,
    currentRequest: currentRequestPropTypes,
    isLoading: PropTypes.bool,
    requestFetching: PropTypes.bool,
};
