import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";

export let EditProfileContainerPropTypes = {
    openModal: PropTypes.bool.isRequired,
    setOpenModal: PropTypes.func.isRequired,
    user: userProfilePropTypes,
};
