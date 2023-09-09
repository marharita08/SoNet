import React from "react";
import ProfileFieldRow from "./ProfileFieldRow";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {currentRequestPropTypes} from "../../../propTypes/currentRequestPropTypes";
import PropTypes from "prop-types";

const ProfileFields = ({user, currentRequest, isAdmin, isCurrentUser}) => {
    return (
        <>

            <ProfileFieldRow
                name={"name"}
                label={"Name"}
                isAdmin={isAdmin}
                isCurrentUser={isCurrentUser}
                isFriends={currentRequest?.is_friends}
                isField={!!user?.name}
            />
            <ProfileFieldRow
                name={"email"}
                label={"Email"}
                isAdmin={isAdmin}
                isCurrentUser={isCurrentUser}
                isFriends={currentRequest?.is_friends}
                visibilityName={"email_visibility.label"}
                visibilityLabel={user?.email_visibility.label}
                isField={!!user?.email}
            />
            <ProfileFieldRow
                name={"phone"}
                label={"Phone"}
                isAdmin={isAdmin}
                isCurrentUser={isCurrentUser}
                isFriends={currentRequest?.is_friends}
                visibilityName={"phone_visibility.label"}
                visibilityLabel={user?.phone_visibility.label}
                isField={!!user?.phone}
            />

            <ProfileFieldRow
                name={"university.label"}
                label={"University"}
                isAdmin={isAdmin}
                isCurrentUser={isCurrentUser}
                isFriends={currentRequest?.is_friends}
                visibilityName={"university_visibility.label"}
                visibilityLabel={user?.university_visibility.label}
                isField={!!user?.university}
            />
        </>
    )
}

ProfileFields.propTypes = {
    user: userProfilePropTypes,
    currentRequest: currentRequestPropTypes,
    isAdmin: PropTypes.bool,
    isCurrentUser: PropTypes.bool
}

ProfileFields.defaultProps = {
    isAdmin: false,
    isCurrentUser: false
}

export default ProfileFields;
