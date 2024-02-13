import PropTypes from "prop-types";
import {optionPropTypes} from "./optionsPropTypes";

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
  email_visibility: optionPropTypes,
  phone: PropTypes.string,
  phone_visibility: optionPropTypes,
  university: optionPropTypes,
  university_visibility: optionPropTypes,
  avatar: PropTypes.string,
  country: optionPropTypes,
  state: optionPropTypes,
  city: optionPropTypes,
  birthday: PropTypes.string|PropTypes.number,
  country_visibility: optionPropTypes,
  state_visibility: optionPropTypes,
  city_visibility: optionPropTypes,
  birthday_visibility: optionPropTypes,
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
