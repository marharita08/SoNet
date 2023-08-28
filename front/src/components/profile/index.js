import { Formik, Form, Field} from 'formik';
import {Avatar, Button, CircularProgress} from "@mui/material";
import { TextField } from 'formik-mui';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import {ProfilePropTypes} from "./profilePropTypes";
import 'cropperjs/dist/cropper.css';
import './profile.css';

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
    requestFetching}) => {

    return (
        <>
            <h1 className={"big_margin"}>Profile</h1>
            <Formik
                enableReinitialize={true}
                initialValues={user}
                onSubmit={null}
            >
                <Form>
                    <div className={"user_img"} >
                        <Avatar
                            className={"big_margin"}
                            src={user?.avatar}
                            sx={{ width: 110, height: 110 }}
                        />
                        {
                            !isCurrentUser &&
                            (requestFetching ? <CircularProgress color="inherit" size={25}/> :
                                <div>
                                    {
                                        currentRequest?.is_not_friends &&
                                        <Button
                                            size={'small'}
                                            onClick={handleAddToFriends}
                                            disabled={isLoading}
                                            startIcon={
                                                isLoading ? (
                                                    <CircularProgress color="inherit" size={25}/>
                                                ) : <PersonAddIcon/>
                                            }
                                        >
                                            Add to friends
                                        </Button>
                                    }
                                    {
                                        currentRequest?.is_incoming_request &&
                                        <Button
                                            size={'small'}
                                            onClick={handleAccept}
                                            disabled={isLoading}
                                            startIcon={
                                                isLoading ? (
                                                    <CircularProgress color="inherit" size={25}/>
                                                ) : <PersonAddIcon/>
                                            }
                                        >
                                            Accept request
                                        </Button>
                                    }
                                    {
                                        (currentRequest?.is_friends || currentRequest?.is_outgoing_request) &&
                                        <Button
                                            size={'small'}
                                            onClick={handleDeleteFromFriends}
                                            disabled={isLoading}
                                            startIcon={
                                                isLoading ? (
                                                    <CircularProgress color="inherit" size={25}/>
                                                ) : <PersonRemoveIcon/>
                                            }
                                        >
                                            {currentRequest?.is_friends && "Delete from friends"}
                                            {currentRequest?.is_outgoing_request && "Delete request"}
                                        </Button>
                                    }
                                </div>)
                        }
                    </div>
                    <div className={"fields_container"}>
                        <div className={"fields_margin"}>
                            <Field
                                component={TextField}
                                type={"text"}
                                name={"name"}
                                label={"Name"}
                                className={"fields_width"}
                                disabled
                            />
                        </div>
                        {
                            (isAdmin || isCurrentUser || user?.email_visibility.label === "All" ||
                                currentRequest?.is_friends && user?.email_visibility.label === "Friends") &&
                            <div className={"fields_margin"}>
                                <Field
                                    component={TextField}
                                    type={"email"}
                                    name={"email"}
                                    disabled
                                    label={"Email"}
                                    className={"fields_width"}
                                />
                                {
                                    (isAdmin || isCurrentUser) &&
                                    <Field
                                        component={TextField}
                                        disabled
                                        name="email_visibility.label"
                                        label="Available to"
                                        className={"visibility"}
                                    />
                                }
                            </div>
                        }
                        {
                            user?.phone &&
                            (isAdmin || isCurrentUser || user?.phone_visibility.label === "All" ||
                                currentRequest?.is_friends && user?.phone_visibility.label === "Friends") &&
                            <div className={"fields_margin"}>

                                    <Field
                                        component={TextField}
                                        name={"phone"}
                                        label={"Phone"}
                                        disabled
                                        className={"fields_width"}
                                    />
                                    {
                                        (isAdmin || isCurrentUser) &&
                                        <Field
                                            component={TextField}
                                            name="phone_visibility.label"
                                            label={"Available to"}
                                            disabled
                                            className={"visibility"}
                                        />
                                    }

                            </div>
                        }
                        {
                            user?.university &&
                            (isAdmin || isCurrentUser || user?.university_visibility.label === "All" ||
                                currentRequest?.is_friends && user?.university_visibility.label === "Friends") &&
                            <div className={"fields_margin"}>

                                    <Field
                                        component={TextField}
                                        disabled
                                        name="university.label"
                                        label="University"
                                        className={"fields_width"}
                                    />
                                    {
                                        (isAdmin || isCurrentUser) &&
                                        <Field
                                            component={TextField}
                                            disabled
                                            name="university_visibility.label"
                                            label="Available to"
                                            className={"visibility"}
                                        />
                                    }
                            </div>
                        }
                        {
                            (isAdmin || isCurrentUser) &&
                            <div align={"center"}>
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
                </Form>
            </Formik>
        </>
    );
}

Profile.propTypes = ProfilePropTypes;

Profile.defaultProps = {
    isCurrentUser: false,
    isAdmin: false,
    isLoading: false,
    requestFetching: false,
}

export default Profile;
