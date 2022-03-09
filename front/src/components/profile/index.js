import { Formik, Form, Field} from 'formik';
import {Avatar, Button, CircularProgress} from "@mui/material";
import { TextField } from 'formik-mui';

import {ProfilePropTypes} from "./profilePropTypes";
import env from "../../config/envConfig";
import 'cropperjs/dist/cropper.css';
import './profile.css';

const Profile = ({
    user,
    handleClick,
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
            <h1 className={"big_margin"}>My profile</h1>
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
                                isCurrentUser &&
                                <Field
                                    component={TextField}
                                    disabled
                                    name="email_visibility.label"
                                    label="Available to"
                                    className={"inline visibility fields_height"}
                                />
                            }
                        </div>
                        <div className={"fields_margin"}>
                            {
                                user.phone &&
                                <div>
                                    <Field
                                        component={TextField}
                                        name={"phone"}
                                        label={"Phone"}
                                        disabled
                                        className={"inline fields_width fields_height"}
                                    />
                                    {
                                        isCurrentUser &&
                                        <Field
                                            component={TextField}
                                            name="phone_visibility.label"
                                            label={"Available to"}
                                            disabled
                                            className={"inline visibility fields_height"}
                                        />
                                    }
                                </div>
                            }
                        </div>
                        <div className={"fields_margin"}>
                            {
                                user.university &&
                                <div>
                                    <Field
                                        component={TextField}
                                        disabled
                                        name="university.label"
                                        label="University"
                                        className={"inline fields_width fields_height"}
                                    />
                                    {
                                        isCurrentUser &&
                                        <Field
                                            component={TextField}
                                            disabled
                                            name="university_visibility.label"
                                            label="Available to"
                                            className={"inline visibility fields_height"}
                                        />
                                    }
                                </div>
                            }
                        </div>
                        {
                            isCurrentUser &&
                            <div align={"center"}>
                                <Button variant={"contained"} onClick={handleClick}>
                                    Edit
                                </Button>
                            </div>
                        }
                    </div>
                    <div className={"user_img"} >
                        <Avatar
                            className={"big_margin"}
                            src={`${env.apiUrl}${user?.avatar}`}
                            sx={{ width: 100, height: 100 }}
                        />
                        {
                            !isCurrentUser &&
                            <div>
                                {
                                    isNotFriends &&
                                    <Button
                                        variant={"outlined"}
                                        onClick={addToFriends}
                                        disabled={isLoading}
                                        startIcon={
                                            isLoading ? (
                                                <CircularProgress color="inherit" size={25}/>
                                            ) : null
                                        }
                                    >
                                        Add to friends
                                    </Button>
                                }
                                {
                                    isIncomingRequest &&
                                    <Button
                                        variant={"outlined"}
                                        onClick={accept}
                                        disabled={isLoading}
                                        startIcon={
                                            isLoading ? (
                                                <CircularProgress color="inherit" size={25}/>
                                            ) : null
                                        }
                                    >
                                        Accept request
                                    </Button>
                                }
                                {
                                    (isFriends || isOutgoingRequest) &&
                                    <Button
                                        variant={"outlined"}
                                        onClick={deleteFromFriends}
                                        disabled={isLoading}
                                        startIcon={
                                            isLoading ? (
                                                <CircularProgress color="inherit" size={25}/>
                                            ) : null
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
