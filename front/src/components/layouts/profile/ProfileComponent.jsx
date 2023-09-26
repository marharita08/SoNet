import React from "react";
import {Formik, Form} from "formik";
import {Avatar} from "@mui/material";
import {ProfilePropTypes} from "./profilePropTypes";
import {useTheme} from "@mui/material/styles";
import ProfileFriendRequestBtn from "./ProfileFriendRequestBtn";
import EditProfileBtn from "./EditProfileBtn";
import ProfileFields from "./ProfileFields";
import {useStyles} from "./style";

const ProfileComponent = ({
    user,
    handleEdit,
    isAdmin,
    isCurrentUser,
    handleAddToFriends,
    handleAccept,
    handleDeleteFromFriends,
    currentRequest,
    isLoading,
    requestFetching
}) => {

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
                                handleAddToFriends={handleAddToFriends}
                                handleDeleteFromFriends={handleDeleteFromFriends}
                                handleAccept={handleAccept}
                                currentRequest={currentRequest}
                                isCurrentUser={isCurrentUser}
                                isLoading={isLoading}
                                requestFetching={requestFetching}
                            />
                        </div>
                        <div className={classes.fieldsContainer}>
                            <ProfileFields
                                user={user}
                                currentRequest={currentRequest}
                                isAdmin={isAdmin}
                                isCurrentUser={isCurrentUser}
                            />
                            <EditProfileBtn
                                onClick={handleEdit}
                                isCurrentUser={isCurrentUser}
                                isAdmin={isAdmin}
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
    isCurrentUser: false,
    isAdmin: false,
    isLoading: false,
    requestFetching: false,
};

export default ProfileComponent;