import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";

export let EditProfileContainerPropTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  user: userProfilePropTypes,
  setUser: PropTypes.func.isRequired
};
