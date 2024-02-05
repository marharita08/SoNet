import React from "react";
import ProfileFieldRow from "./ProfileFieldRow";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {currentRequestPropTypes} from "../../../propTypes/currentRequestPropTypes";
import PropTypes from "prop-types";

const ProfileFields = ({user, currentRequest, isAdmin, isCurrentUser}) => {

  const isFriends = currentRequest?.is_friends;

  return (
    <>
      <ProfileFieldRow
        name={"name"}
        label={"Name"}
        isAdmin={isAdmin}
        isCurrentUser={isCurrentUser}
        isFriends={isFriends}
        isField={!!user?.name}
      />
      <ProfileFieldRow
        name={"email"}
        label={"Email"}
        isAdmin={isAdmin}
        isCurrentUser={isCurrentUser}
        isFriends={isFriends}
        visibilityName={"email_visibility.label"}
        visibilityLabel={user?.email_visibility.label}
        isField={!!user?.email}
      />
      <ProfileFieldRow
        name={"birthday"}
        label={"Birthday"}
        isAdmin={isAdmin}
        isCurrentUser={isCurrentUser}
        isFriends={isFriends}
        visibilityName={"birthday_visibility.label"}
        visibilityLabel={user?.birthday_visibility.label}
        isField={!!user?.birthday}
      />
      <ProfileFieldRow
        name={"phone"}
        label={"Phone"}
        isAdmin={isAdmin}
        isCurrentUser={isCurrentUser}
        isFriends={isFriends}
        visibilityName={"phone_visibility.label"}
        visibilityLabel={user?.phone_visibility.label}
        isField={!!user?.phone}
      />
      <ProfileFieldRow
        name={"country.label"}
        label={"Country"}
        isAdmin={isAdmin}
        isCurrentUser={isCurrentUser}
        isFriends={isFriends}
        visibilityName={"country_visibility.label"}
        visibilityLabel={user?.country_visibility.label}
        isField={!!user?.country}
      />
      <ProfileFieldRow
        name={"state.label"}
        label={"State"}
        isAdmin={isAdmin}
        isCurrentUser={isCurrentUser}
        isFriends={isFriends}
        visibilityName={"state_visibility.label"}
        visibilityLabel={user?.state_visibility.label}
        isField={!!user?.state}
      />
      <ProfileFieldRow
        name={"city.label"}
        label={"City"}
        isAdmin={isAdmin}
        isCurrentUser={isCurrentUser}
        isFriends={isFriends}
        visibilityName={"city_visibility.label"}
        visibilityLabel={user?.city_visibility.label}
        isField={!!user?.city}
      />
      <ProfileFieldRow
        name={"university.label"}
        label={"University"}
        isAdmin={isAdmin}
        isCurrentUser={isCurrentUser}
        isFriends={isFriends}
        visibilityName={"university_visibility.label"}
        visibilityLabel={user?.university_visibility.label}
        isField={!!user?.university}
      />
    </>
  );
};

ProfileFields.propTypes = {
  user: userProfilePropTypes,
  currentRequest: currentRequestPropTypes,
  isAdmin: PropTypes.bool,
  isCurrentUser: PropTypes.bool
};

ProfileFields.defaultProps = {
  isAdmin: false,
  isCurrentUser: false
};

export default ProfileFields;
