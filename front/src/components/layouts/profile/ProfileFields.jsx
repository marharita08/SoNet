import React from "react";
import ProfileFieldRow from "./ProfileFieldRow";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import PropTypes from "prop-types";

const ProfileFields = ({user, flags}) => {

  return (
    <>
      <ProfileFieldRow
        name={"name"}
        label={"Name"}
        flags={{
          isField: !!user?.name,
          ...flags
        }}
      />
      <ProfileFieldRow
        name={"email"}
        label={"Email"}
        visibilityName={"email_visibility.label"}
        visibilityLabel={user?.email_visibility.label}
        flags={{
          isField: !!user?.email,
          ...flags
        }}
      />
      <ProfileFieldRow
        name={"birthday"}
        label={"Birthday"}
        visibilityName={"birthday_visibility.label"}
        visibilityLabel={user?.birthday_visibility.label}
        flags={{
          isField: !!user?.birthday,
          ...flags
        }}
      />
      <ProfileFieldRow
        name={"phone"}
        label={"Phone"}
        visibilityName={"phone_visibility.label"}
        visibilityLabel={user?.phone_visibility.label}
        flags={{
          isField: !!user?.phone,
          ...flags
        }}
      />
      <ProfileFieldRow
        name={"country.label"}
        label={"Country"}
        visibilityName={"country_visibility.label"}
        visibilityLabel={user?.country_visibility.label}
        flags={{
          isField: !!user?.country,
          ...flags
        }}
      />
      <ProfileFieldRow
        name={"state.label"}
        label={"State"}
        visibilityName={"state_visibility.label"}
        visibilityLabel={user?.state_visibility.label}
        flags={{
          isField: !!user?.state,
          ...flags
        }}
      />
      <ProfileFieldRow
        name={"city.label"}
        label={"City"}
        visibilityName={"city_visibility.label"}
        visibilityLabel={user?.city_visibility.label}
        flags={{
          isField: !!user?.city,
          ...flags
        }}
      />
      <ProfileFieldRow
        name={"university.label"}
        label={"University"}
        visibilityName={"university_visibility.label"}
        visibilityLabel={user?.university_visibility.label}
        flags={{
          isField: !!user?.university,
          ...flags
        }}
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
