import { Formik, Form, Field} from 'formik';
import {Avatar, Button, CircularProgress} from "@mui/material";
import { TextField } from 'formik-mui';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import {ProfilePropTypes} from "./profilePropTypes";
import env from "../../config/envConfig";
import 'cropperjs/dist/cropper.css';
import './profile.css';

const Profile = ({
    user,
    handleClick,
    isAdmin,
    isCurrentUser,
    addToFriends,
    accept,
    deleteFromFriends,
    isFriends,
    isOutgoingRequest,
    isIncomingRequest,
    isNotFriends,
    isLoading
}) => {

    return (
        <>
            <h1 className={"big_margin"}>Profile</h1>
            <Formik
                initialValues={user}
                onSubmit={null}
            >
                <Form>
                    <div className={"inline big_margin"}>
                        <div className={"fields_margin"}>
                            <Field
                                component={TextField}
                                type={"text"}
                                name={"name"}
                                label={"Name"}
                                className={"inline fields_width fields_height"}
                                disabled
                            />
                        </div>
                        {
                            (isAdmin || isCurrentUser || user.email_visibility.label === "All" ||
                            isFriends && user.email_visibility.label === "Friends") &&
                            <div className={"fields_margin"}>
                                <Field
                                    component={TextField}
                                    type={"email"}
                                    name={"email"}
                                    disabled
                                    label={"Email"}
                                    className={"inline fields_width fields_height"}
                                />
                                {
                                    (isAdmin || isCurrentUser) &&
                                    <Field
                                        component={TextField}
                                        disabled
                                        name="email_visibility.label"
                                        label="Available to"
                                        className={"inline visibility fields_height"}
                                    />
                                }
                            </div>
                        }
                        {
                            user.phone &&
                            (isAdmin || isCurrentUser || user.phone_visibility.label === "All" ||
                             isFriends && user.phone_visibility.label === "Friends") &&
                            <div className={"fields_margin"}>
                                <div>
                                    <Field
                                        component={TextField}
                                        name={"phone"}
                                        label={"Phone"}
                                        disabled
                                        className={"inline fields_width fields_height"}
                                    />
                                    {
                                        (isAdmin || isCurrentUser) &&
                                        <Field
                                            component={TextField}
                                            name="phone_visibility.label"
                                            label={"Available to"}
                                            disabled
                                            className={"inline visibility fields_height"}
                                        />
                                    }
                                </div>
                            </div>
                        }
                        {
                            user.university &&
                            (isAdmin || isCurrentUser || user.university_visibility.label === "All" ||
                             isFriends && user.university_visibility.label === "Friends") &&
                            <div className={"fields_margin"}>

                                <div>
                                    <Field
                                        component={TextField}
                                        disabled
                                        name="university.label"
                                        label="University"
                                        className={"inline fields_width fields_height"}
                                    />
                                    {
                                        (isAdmin || isCurrentUser) &&
                                        <Field
                                            component={TextField}
                                            disabled
                                            name="university_visibility.label"
                                            label="Available to"
                                            className={"inline visibility fields_height"}
                                        />
                                    }
                                </div>
                            </div>
                        }
                        {
                            (isAdmin || isCurrentUser) &&
                            <div align={"center"}>
                                <Button
                                    variant={"contained"}
                                    onClick={handleClick}
                                    startIcon={<EditIcon fontSize={"small"}/>}
                                >
                                    Edit
                                </Button>
                            </div>
                        }
                    </div>
                    <div className={"user_img"} >
                        <Avatar
                            className={"big_margin"}
                            src={`${env.apiUrl}${user?.avatar}`}
                            sx={{ width: 110, height: 110 }}
                        />
                        {
                            !isCurrentUser &&
                            <div>
                                {
                                    isNotFriends &&
                                    <Button
                                        size={'small'}
                                        onClick={addToFriends}
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
                                    isIncomingRequest &&
                                    <Button
                                        size={'small'}
                                        onClick={accept}
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
                                    (isFriends || isOutgoingRequest) &&
                                    <Button
                                        size={'small'}
                                        onClick={deleteFromFriends}
                                        disabled={isLoading}
                                        startIcon={
                                            isLoading ? (
                                                <CircularProgress color="inherit" size={25}/>
                                            ) : <PersonRemoveIcon/>
                                        }
                                    >
                                        {isFriends && "Delete from friends"}
                                        {isOutgoingRequest && "Delete request"}
                                    </Button>
                                }
                            </div>
                        }
                    </div>
                </Form>
            </Formik>
        </>
    );
}

Profile.propTypes = ProfilePropTypes;

export default Profile;
