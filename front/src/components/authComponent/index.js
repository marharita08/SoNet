import React from "react";
import { GoogleLogin } from 'react-google-login';
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {TextField} from "formik-mui";
import {Button, Card, CardHeader} from "@mui/material";
import PropTypes from "prop-types";

import env from "../../config/envConfig";

const AuthComponent = ({onGoogleSuccess, onGoogleFailure, onFormSubmit, initialUser}) => {

    const schema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    return (
        <div align={"center"}>
            <Card sx={{width: '500px'}}>
                <CardHeader
                    title={'Login'}
                />
                <div>
                    <Formik
                        onSubmit={onFormSubmit}
                        validationSchema={schema}
                        initialValues={initialUser}
                    >
                        <Form>
                            <Field
                                component={TextField}
                                type={"email"}
                                name={"email"}
                                label={"Email"}
                                sx={{margin:'5px'}}
                            />
                            <br/>
                            <Field
                                component={TextField}
                                type={"password"}
                                name={"password"}
                                label={"Password"}
                                className={'margin'}
                                sx={{margin:'5px'}}
                            />
                            <br/>
                            <Button
                                variant="contained"
                                type="submit"
                                className={'margin'}
                                sx={{margin:'5px'}}
                            >
                                Log in
                            </Button>
                        </Form>
                    </Formik>
                </div>
                <GoogleLogin
                    clientId={env.clientId}
                    buttonText="Login with google"
                    onSuccess={onGoogleSuccess}
                    onFailure={onGoogleFailure}
                    className="google-login-button margin"
                    accessType="offline"
                />
            </Card>
        </div>
    )
}

AuthComponent.propTypes = {
    onGoogleSuccess: PropTypes.func.isRequired,
    onGoogleFailure: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    initialUser: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    })
}

export default AuthComponent;
