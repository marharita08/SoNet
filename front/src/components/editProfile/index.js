import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import FormikAutocomplete from "../FormikAutocomplete";
import {Avatar, Button, CircularProgress, Dialog, DialogTitle, IconButton} from "@mui/material";
import env from "../../config/envConfig";
import Cropper from "react-cropper";
import * as Yup from "yup";
import {EditProfilePropTypes} from "./editProfilePropTypes";
import ReactLoading from "react-loading";
import React from "react";

const EditProfile = (
    props
) => {

    const {
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
    } = props;

        const schema = Yup.object().shape({
        name: Yup.string().required("Name is required").max(255, "Mast be no more than 255 symbols"),
        name_visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
        email: Yup.string().required("Email is required"),
        email_visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
        phone: Yup.string().required("Phone number is required").matches(/^[+]380[\d]{9}$/, "Must match +380xxxxxxxxx"),
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
                                <span>&times;</span>
                            </IconButton>
                            <DialogTitle>Edit profile</DialogTitle>
                            <div className={"user_img"} >
                                <Avatar
                                    alt={user?.name}
                                    className={"big_margin"}
                                    src={croppedImage||`${env.apiUrl}${user?.avatar}`}
                                    sx={{ width: 100, height: 100 }}
                                />
                                <label htmlFor="contained-button-file" className={"file margin"}>
                                    <Button variant="outlined" component="span">
                                        Change avatar
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
                                        Crop
                                    </Button>
                                }
                                {(croppedImage||image) &&
                                    <Button
                                        variant={"contained"}
                                        onClick={() => deleteImage(setFieldValue)}
                                        color={'error'}
                                        style={{display: "block", margin: 5}}
                                    >
                                        Delete image
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
                                    <Field
                                        component={FormikAutocomplete}
                                        name="name_visibility"
                                        label={"Available to"}
                                        options={visibilities}
                                        className={"inline visibility fields_height"}
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
                                            ) : null
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
