import React from "react";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import {Button} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {userAuthPropTypes} from "../../../propTypes/userPropTypes";
import ProgressOrComponent from "../../atoms/progressOrComponent/ProgressOrComponent";
import {useStyles} from "./style";
import PasswordField from "../../atoms/fields/PasswordField";

const LoginForm = ({onFormSubmit, initialUser, isLoading}) => {

    const classes = useStyles();

    const schema = Yup.object().shape({
        email: Yup.string().required("Email is required")
            .email("Email is invalid")
            .max(255, "Email should contain no more than 255 symbols"),
        password: Yup.string().required("Password is required").min(8, "Password should contain more than 8 symbols"),
    });

    return (
        <Formik
            onSubmit={onFormSubmit}
            validationSchema={schema}
            initialValues={initialUser}
        >
            <Form className={classes.authForm}>
                <div className={classes.authField}>
                    <Field
                        component={TextField}
                        type={"email"}
                        name={"email"}
                        label={"Email"}
                        fullWidth
                    />
                </div>
                <div className={classes.authField}>
                    <Field
                        component={PasswordField}
                        name={"password"}
                        label={"Password"}
                        fullWidth
                    />
                </div>
                <Button
                    variant="contained"
                    type="submit"
                    startIcon={
                        <ProgressOrComponent
                            isProgress={isLoading}
                            component={<LoginIcon/>}
                        />
                    }
                    disabled={isLoading}
                >
                    Log in
                </Button>
            </Form>
        </Formik>
    );
};

LoginForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    initialUser: userAuthPropTypes.isRequired,
    isLoading: PropTypes.bool
};

LoginForm.defaultProps = {
    isLoading: false
};

export default LoginForm;
