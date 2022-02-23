import { Formik, Form, Field} from 'formik';
import {Avatar, Button} from "@mui/material";
import { TextField } from 'formik-mui';

import './profile.css';
import {ProfilePropTypes} from "./profilePropTypes";
import env from "../../config/envConfig";
import 'cropperjs/dist/cropper.css';

const Profile = ({
    user,
    handleClick,
    isCurrentUser
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
                            {
                                isCurrentUser &&
                                <Field
                                    component={TextField}
                                    name="name_visibility.label"
                                    label={"Available to"}
                                    className={"inline visibility fields_height"}
                                    disabled
                                />
                            }
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
                        <div className={"fields_margin"}>
                            {
                                user.university &&
                                <Field
                                    component={TextField}
                                    disabled
                                    name="university.label"
                                    label="University"
                                    className={"inline fields_width fields_height"}
                                />
                            }
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
                            alt={user?.name}
                            className={"big_margin"}
                            src={`${env.apiUrl}${user?.avatar}`}
                            sx={{ width: 100, height: 100 }}
                        />
                    </div>
                </Form>
            </Formik>
        </>
    );
}

Profile.propTypes = ProfilePropTypes;

export default Profile;
