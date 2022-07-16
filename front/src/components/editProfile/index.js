import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import FormikAutocomplete from "../FormikAutocomplete";
import {Avatar, Button, CircularProgress, Dialog, DialogTitle, IconButton} from "@mui/material";
import Cropper from "react-cropper";
import * as Yup from "yup";
import ReactLoading from "react-loading";
import React from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from "@mui/icons-material/Close";

import env from "../../config/envConfig";
import {EditProfilePropTypes} from "./editProfilePropTypes";
import AlertContainer from "../../containers/alert";

const EditProfile = ({
        universities,
        visibilities,
        onFormSubmit,
        isLoading,
        image,
        croppedImage,
        deleteImage,
        cropImage,
        handleChange,
        setCropper,
        openModal,
        handleClose,
        user,
        isFetching,
        message,
        handleAlertClose,
}) => {
        const schema = Yup.object().shape({
        name: Yup.string().required("Name is required").max(255, "Name should contain not more than 255 symbols"),
        email: Yup.string().required("Email is required").max(255, "Name should contain not more than 255 symbols"),
        email_visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
        password: Yup.string().min(8, "Password should contain at least 8 symbols").nullable(),
        phone: Yup.string().matches(/^\+380\d{9}$/, "Phone should match +380xxxxxxxxx").nullable(),
        phone_visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
        university: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
        university_visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable()
    })

    return (
        <>
            <Dialog
                open={openModal}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <AlertContainer alertMessage={message} alertSeverity={'error'} handleClose={handleAlertClose}/>
                {
                    isFetching &&
                    <div align={"center"}>
                        <ReactLoading type={'balls'} color='#001a4d'/>
                    </div>
                }
                <Formik
                    initialValues={user}
                    onSubmit={onFormSubmit}
                    validationSchema={schema}
                >
                    {({ setFieldValue, handleSubmit }) =>
                        <Form onSubmit={handleSubmit}>
                            <IconButton className="closebtn margin" onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                            <DialogTitle>Edit profile</DialogTitle>
                            <div className={"user_img"} >
                                <Avatar
                                    className={"big_margin"}
                                    src={croppedImage||`${env.apiUrl}${user?.avatar}`}
                                    sx={{ width: 110, height: 110 }}
                                />
                                <label htmlFor="contained-button-file" className={"file margin"}>
                                    <Button variant={"contained"} component="span">
                                        <AddAPhotoIcon fontSize={"large"}/>
                                        <input hidden
                                               id="contained-button-file"
                                               type="file"
                                               name="avatar"
                                               onChange={handleChange}
                                        />
                                    </Button>
                                </label>
                                {image &&
                                    <Button
                                        variant={"contained"}
                                        onClick={ () => cropImage(setFieldValue) }
                                        color={'success'}
                                        style={{display: "block", margin: 5}}
                                    >
                                        <ContentCutIcon fontSize={"large"}/>
                                    </Button>
                                }
                                {(croppedImage||image) &&
                                    <Button
                                        variant={"contained"}
                                        onClick={() => deleteImage(setFieldValue)}
                                        color={'error'}
                                        style={{display: "block", margin: 5}}
                                    >
                                        <DeleteIcon fontSize={"large"}/>
                                    </Button>
                                }
                            </div>
                            <div className={"inline"}>
                                {image && (
                                    <Cropper
                                        src={image}
                                        zoomable={false}
                                        scalable={false}
                                        onInitialized={instance => setCropper(instance)}
                                        rotatable={false}
                                        viewMode={1}
                                        style={{ height: 400, width: 400, margin: 5 }}
                                    />
                                )}
                            </div>
                            <div className={"inline big_margin"}>
                                <div className={"fields_margin"}>
                                    <Field
                                        component={TextField}
                                        type={"text"}
                                        name={"name"}
                                        label={"Name"}
                                        className={"inline fields_width fields_height"}
                                    />
                                </div>
                                <div className={"fields_margin"}>
                                    <Field
                                        component={TextField}
                                        type={"email"}
                                        name={"email"}
                                        label={"Email"}
                                        className={"inline fields_width fields_height"}
                                    />
                                    <Field
                                        component={FormikAutocomplete}
                                        name="email_visibility"
                                        label="Available to"
                                        options={visibilities}
                                        className={"inline visibility fields_height"}
                                    />
                                </div>
                                <div className={"fields_margin"}>
                                    <Field
                                        component={TextField}
                                        type={"password"}
                                        name={"password"}
                                        label={"Password"}
                                        className={"inline fields_width fields_height"}
                                    />
                                </div>
                                <div className={"fields_margin"}>
                                    <Field
                                        component={TextField}
                                        name={"phone"}
                                        label={"Phone"}
                                        className={"inline fields_width fields_height"}
                                    />
                                    <Field
                                        component={FormikAutocomplete}
                                        name="phone_visibility"
                                        label={"Available to"}
                                        options={visibilities}
                                        className={"inline visibility fields_height"}
                                    />
                                </div>
                                <div className={"fields_margin"}>
                                    <Field
                                        component={FormikAutocomplete}
                                        name="university"
                                        label="University"
                                        options={universities}
                                        className={"inline fields_width fields_height"}
                                    />
                                    <Field
                                        component={FormikAutocomplete}
                                        name="university_visibility"
                                        label="Available to"
                                        options={visibilities}
                                        className={"inline visibility fields_height"}
                                    />
                                </div>
                                <div align={"center"}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={isLoading}
                                        startIcon={
                                            isLoading ? (
                                                <CircularProgress color="inherit" size={25} />
                                            ) : <SaveIcon/>
                                        }
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    }
                </Formik>
            </Dialog>
        </>
    )
}

EditProfile.propTypes = EditProfilePropTypes;

export default EditProfile;
