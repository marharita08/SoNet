import React from "react";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import {Button, Card, CardHeader, Typography} from "@mui/material";
import ProgressOrComponent from "../../atoms/progressOrComponent/ProgressOrComponent";
import SendIcon from '@mui/icons-material/Send';
import PropTypes from "prop-types";
import {useStyles} from "../../style";

const ResetPasswordPageComponent = ({onFormSubmit, initialValues, isLoading}) => {

    const classes = useStyles();

    const schema = Yup.object().shape({
        email: Yup.string().required("Email is required")
            .email("Email is invalid")
            .max(255, "Email should contain no more than 255 symbols"),
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
                        Input email linked to your profile.<br/>
                        We will send message with link on password changing.
                    </Typography>
                    <div className={classes.authField}>
                        <Field
                            component={TextField}
                            type={"email"}
                            name={"email"}
                            label={"Email"}
                            fullWidth
                        />
                    </div>
                    <Button
                        variant="contained"
                        type="submit"
                        startIcon={
                            <ProgressOrComponent
                                isProgress={isLoading}
                                component={<SendIcon/>}
                            />
                        }
                        disabled={isLoading}
                    >
                        Send
                    </Button>
                </Form>
            </Formik>
        </Card>
    );
};

ResetPasswordPageComponent.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        email: PropTypes.string
    }),
    isLoading: PropTypes.bool
};

export default ResetPasswordPageComponent;
