import React from "react";
import {Formik, Form, Field} from "formik";
import {Avatar, Button, CircularProgress} from "@mui/material";
import {TextField} from "formik-mui";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {ProfilePropTypes} from "./profilePropTypes";
import "cropperjs/dist/cropper.css";
import "./profile.css";
import FriendRequestBtn from "../buttons/FriendRequestBtn";
import {useTheme} from "@mui/material/styles";

const Profile = ({
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

    const theme = useTheme();

    return (
        <>
            <h1 className={"big_margin"}>Profile</h1>
            <Formik
                enableReinitialize={true}
                initialValues={user}
                onSubmit={null}
            >
                <Form>
                    <div className={"profile-container"}>
                        <div className={"profile-image-container"}>
                            <Avatar
                                className={"profile-image"}
                                src={user?.avatar}
                                sx={theme.avatarSizes.xl}
                            />
                            {
                                !isCurrentUser && (requestFetching ? <CircularProgress color="inherit" size={25}/> :
                                        <>
                                            <FriendRequestBtn
                                                isLoading={isLoading}
                                                onClick={handleAddToFriends}
                                                isVisible={Boolean(currentRequest?.is_not_friends)}
                                                text={"Add to friends"}
                                                icon={<PersonAddIcon/>}
                                            />
                                            <FriendRequestBtn
                                                isLoading={isLoading}
                                                onClick={handleAccept}
                                                isVisible={Boolean(currentRequest?.is_incoming_request)}
                                                text={"Accept request"}
                                                icon={<PersonAddIcon/>}
                                            />
                                            <FriendRequestBtn
                                                isLoading={isLoading}
                                                onClick={handleDeleteFromFriends}
                                                isVisible={Boolean(currentRequest?.is_friends)}
                                                text={"Delete from friends"}
                                                icon={<PersonRemoveIcon/>}
                                            />
                                            <FriendRequestBtn
                                                isLoading={isLoading}
                                                onClick={handleDeleteFromFriends}
                                                isVisible={Boolean(currentRequest?.is_outgoing_request)}
                                                text={"Delete request"}
                                                icon={<PersonRemoveIcon/>}
                                            />
                                        </>
                                )
                            }
                        </div>
                        <div className={"profile_fields_container"}>
                            <div>
                                <div className={"profile-field "
                                    + (isAdmin || isCurrentUser ? "profile-field-width-not-full" : "profile-field-width-full")}>
                                    <Field
                                        component={TextField}
                                        type={"text"}
                                        name={"name"}
                                        label={"Name"}
                                        disabled
                                        fullWidth
                                    />
                                </div>
                                {
                                    (isAdmin || isCurrentUser) && <div className={"profile-visibility"}></div>
                                }
                            </div>
                            {
                                (isAdmin || isCurrentUser || user?.email_visibility.label === "All" ||
                                    currentRequest?.is_friends && user?.email_visibility.label === "Friends") &&
                                <div>
                                    <div className={"profile-field "
                                        + (isAdmin || isCurrentUser ? "profile-field-width-not-full" : "profile-field-width-full")}>
                                        <Field
                                            component={TextField}
                                            type={"email"}
                                            name={"email"}
                                            disabled
                                            label={"Email"}
                                            fullWidth
                                        />
                                    </div>
                                    {
                                        (isAdmin || isCurrentUser) &&
                                        <div className={"profile-visibility"}>
                                            <Field
                                                component={TextField}
                                                disabled
                                                name="email_visibility.label"
                                                label="Available to"
                                                fullWidth
                                            />
                                        </div>
                                    }
                                </div>
                            }
                            {
                                user?.phone &&
                                (isAdmin || isCurrentUser || user?.phone_visibility.label === "All" ||
                                    currentRequest?.is_friends && user?.phone_visibility.label === "Friends") &&
                                <div>
                                    <div className={"profile-field "
                                        + (isAdmin || isCurrentUser ? "profile-field-width-not-full" : "profile-field-width-full")}>
                                        <Field
                                            component={TextField}
                                            name={"phone"}
                                            label={"Phone"}
                                            disabled
                                            fullWidth
                                        />
                                    </div>
                                    {
                                        (isAdmin || isCurrentUser) &&
                                        <div className={"profile-visibility"}>
                                            <Field
                                                component={TextField}
                                                name="phone_visibility.label"
                                                label={"Available to"}
                                                disabled
                                                fullWidth
                                            />
                                        </div>
                                    }
                                </div>
                            }
                            {
                                user?.university &&
                                (isAdmin || isCurrentUser || user?.university_visibility.label === "All" ||
                                    currentRequest?.is_friends && user?.university_visibility.label === "Friends") &&
                                <div>
                                    <div className={"profile-field "
                                        + (isAdmin || isCurrentUser ? "profile-field-width-not-full" : "profile-field-width-full")}>
                                        <Field
                                            component={TextField}
                                            disabled
                                            name="university.label"
                                            label="University"
                                            fullWidth
                                        />
                                    </div>
                                    {
                                        (isAdmin || isCurrentUser) &&
                                        <div className={"profile-visibility"}>
                                            <Field
                                                component={TextField}
                                                disabled
                                                name="university_visibility.label"
                                                label="Available to"
                                                fullWidth
                                            />
                                        </div>
                                    }
                                </div>
                            }
                            {
                                (isAdmin || isCurrentUser) &&
                                <div align={"center"} className={"margin"}>
                                    <Button
                                        variant={"contained"}
                                        onClick={handleEdit}
                                        startIcon={<EditIcon fontSize={"small"}/>}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );
};

Profile.propTypes = ProfilePropTypes;

Profile.defaultProps = {
    isCurrentUser: false,
    isAdmin: false,
    isLoading: false,
    requestFetching: false,
};

export default Profile;
