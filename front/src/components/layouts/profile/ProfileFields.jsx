import React from "react";
import ProfileFieldRow from "./ProfileFieldRow";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import PropTypes from "prop-types";

const ProfileFields = ({user, flags}) => {

  return (
    <>
      <ProfileFieldRow
        label={"Name"}
        content={user?.name}
        flags={flags}
      />
      <ProfileFieldRow
        label={"Email"}
        content={user?.email}
        visibility={user?.email_visibility.label}
        flags={flags}
      />
      <ProfileFieldRow
        label={"Birthday"}
        visibility={user?.birthday_visibility.label}
        content={user?.birthday}
        flags={flags}
      />
      <ProfileFieldRow
        label={"Phone"}
        visibility={user?.phone_visibility.label}
        content={user?.phone}
        flags={flags}
      />
      <ProfileFieldRow
        label={"Country"}
        visibility={user?.country_visibility.label}
        content={user?.country?.label}
        flags={flags}
      />
      <ProfileFieldRow
        label={"State"}
        visibility={user?.state_visibility.label}
        content={user?.state?.label}
        flags={flags}
      />
      <ProfileFieldRow
        label={"City"}
        visibility={user?.city_visibility.label}
        content={user?.city?.label}
        flags={flags}
      />
      <ProfileFieldRow
        label={"University"}
        visibility={user?.university_visibility.label}
        content={user?.university?.label}
        flags={flags}
      />
      <ProfileFieldRow
        label={"Interests"}
        content={user?.interest_names.join(", ")}
        flags={flags}
      />
    </>
  );
};

ProfileFields.propTypes = {
  user: userProfilePropTypes,
  flags: PropTypes.shape({
    isFriends: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isCurrentUser: PropTypes.bool
  }),
};

ProfileFields.defaultProps = {
  flags: {
    isFriends: false,
    isAdmin: false,
    isCurrentUser: false
  }
};

export default ProfileFields;
