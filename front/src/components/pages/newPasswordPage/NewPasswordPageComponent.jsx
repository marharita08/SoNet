import React from "react";
import {useStyles} from "../../style";
import * as Yup from "yup";
import {Button, Card, CardHeader, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import ProgressOrComponent from "../../atoms/progressOrComponent/ProgressOrComponent";
import SaveIcon from "@mui/icons-material/Save";
import PasswordField from "../../atoms/fields/PasswordField";
import PropTypes from "prop-types";

const NewPasswordPageComponent = ({onFormSubmit, initialValues, isLoading}) => {

    const classes = useStyles();

    const schema = Yup.object().shape({
        password: Yup.string().required("Field is required").min(8, "Password should contain more than 8 symbols"),
        confirmPassword: Yup.string().required("Field is required")
            .oneOf([Yup.ref('password'), null], 'Passwords don\'t match.')
    });

    return (
        <Card className={classes.authCard}>
            <CardHeader title={"Reset Password"}/>
            <Formik
                onSubmit={onFormSubmit}
                validationSchema={schema}
                initialValues={initialValues}
            >
                <Form className={classes.authForm}>
                    <Typography>
                        Input new password.
                    </Typography>
                    <div className={classes.authField}>
                        <Field
                            component={PasswordField}
                            name={"password"}
                            label={"Password"}
                            fullWidth
                        />
                    </div>
                    <div className={classes.authField}>
                        <Field
                            component={PasswordField}
                            name={"confirmPassword"}
                            label={"Confirm Password"}
                            fullWidth
                        />
                    </div>
                    <Button
                        variant="contained"
                        type="submit"
                        startIcon={
                            <ProgressOrComponent
                                isProgress={isLoading}
                                component={<SaveIcon/>}
                            />
                        }
                        disabled={isLoading}
                    >
                        Save new password
                    </Button>
                </Form>
            </Formik>
        </Card>
    );
}

NewPasswordPageComponent.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        password: PropTypes.string,
        confirmPassword: PropTypes.string
    }),
    isLoading: PropTypes.bool
}

export default NewPasswordPageComponent;
