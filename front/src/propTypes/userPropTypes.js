import PropTypes from "prop-types";
import {universityPropTypes} from "./universitiesPropTypes";
import {visibilityPropTypes} from "./visibilitiesPropTypes";

export const usersPopoverPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        avatar: PropTypes.string
    })
);

export const userAuthPropTypes = PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
});

export const userProfilePropTypes = PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    email_visibility: visibilityPropTypes,
    phone: PropTypes.string,
    phone_visibility: visibilityPropTypes,
    university: universityPropTypes,
    university_visibility: visibilityPropTypes,
    avatar: PropTypes.string
});

export const userCardPropTypes = PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
});

export const usersCardPropTypes = PropTypes.arrayOf(userCardPropTypes);

export const userForSearchPropTypes = PropTypes.shape({
    request_id: PropTypes.number,
    user_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string,
    is_not_friends: PropTypes.bool,
    is_friends: PropTypes.bool,
    is_incoming_request: PropTypes.bool,
    is_outgoing_request: PropTypes.bool
});

export const usersForSearchPropTypes = PropTypes.arrayOf(userForSearchPropTypes);
