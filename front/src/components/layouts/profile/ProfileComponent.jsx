import React from "react";
import {Formik, Form} from "formik";
import {Avatar} from "@mui/material";
import {ProfilePropTypes} from "./profilePropTypes";
import {useTheme} from "@mui/material/styles";

import ProfileFriendRequestBtn from "./ProfileFriendRequestBtn";
import EditProfileBtn from "./EditProfileBtn";
import ProfileFields from "./ProfileFields";
import {useStyles} from "./style";

const ProfileComponent = ({user, actions, flags, currentRequest, loading}) => {

  const {handleEdit, ...requestBtnActions} = actions;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <h1 className={classes.heading}>Profile</h1>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        onSubmit={null}
      >
        <Form>
          <div className={classes.container}>
            <div className={classes.imageContainer}>
              <Avatar
                src={user?.avatar}
                sx={theme.avatarSizes.xl}
              />
              <ProfileFriendRequestBtn
                currentRequest={currentRequest}
                isCurrentUser={flags.isCurrentUser}
                loading={loading}
                actions={requestBtnActions}
              />
            </div>
            <div className={classes.fieldsContainer}>
              <ProfileFields
                user={user}
                flags={{isFriends: currentRequest?.is_friends, ...flags}}
              />
              <EditProfileBtn
                onClick={handleEdit}
                flags={flags}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

ProfileComponent.propTypes = ProfilePropTypes;

ProfileComponent.defaultProps = {
  flags: {
    isCurrentUser: false,
    isAdmin: false
  },
  loading: {
    isLoading: false,
    requestFetching: false
  }
};

export default ProfileComponent;
