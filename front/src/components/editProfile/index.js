import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import FormikAutocomplete from "../fields/FormikAutocomplete";
import {
    Avatar,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";
import Cropper from "react-cropper";
import * as Yup from "yup";
import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from "@mui/icons-material/Close";
import {EditProfilePropTypes} from "./editProfilePropTypes";
import AlertContainer from "../../containers/alert";
import Loading from "../../components/loading";
import CropImageBtn from "../buttons/CropImageBtn";
import AddImageBtn from "../buttons/AddImageBtn";
import DeleteImageBtn from "../buttons/DeleteImageBtn";
import './editProfile.css';
import {useStyles as useAvatarStyles} from "../avatarSize";

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
        handleAlertClose}) => {

    const avatarSize = useAvatarStyles();

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
        <Dialog
            open={openModal}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
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
                        <DialogTitle className={"heading"}>Edit profile</DialogTitle>
                        <AlertContainer alertMessage={message} handleClose={handleAlertClose}/>
                        <DialogContent>
                        <Loading isLoading={isFetching}/>
                        <Avatar
                            className={"edit-profile-avatar " + avatarSize.xl}
                            src={croppedImage||user?.avatar}
                        />
                        {image && (
                            <div className={"margin"}>
                                <Cropper
                                    src={image}
                                    zoomable={false}
                                    scalable={false}
                                    onInitialized={instance => setCropper(instance)}
                                    rotatable={false}
                                    viewMode={1}
                                    className={"full-width"}
                                />
                            </div>
                        )}
                        <DialogActions style={{justifyContent: "center"}}>
                            <AddImageBtn onChange={handleChange} isImage={croppedImage||user?.avatar}/>
                            {image && <CropImageBtn onClick={() => cropImage(setFieldValue)} />}
                            {(croppedImage || image) && <DeleteImageBtn onClick={() => deleteImage(setFieldValue)}/>}
                        </DialogActions>
                        <div className={"edit-profile-fields-container"}>
                            <div>
                                <div className={"edit-profile-field"}>
                                    <Field
                                        component={TextField}
                                        type={"text"}
                                        name={"name"}
                                        label={"Name"}
                                        fullWidth
                                    />
                                </div>
                                <div className={"edit-profile-visibility"}></div>
                            </div>
                            <div>
                                <div className={"edit-profile-field"}>
                                    <Field
                                        component={TextField}
                                        type={"email"}
                                        name={"email"}
                                        label={"Email"}
                                        fullWidth
                                    />
                                </div>
                                <div className={"edit-profile-visibility"}>
                                    <Field
                                        component={FormikAutocomplete}
                                        name="email_visibility"
                                        label="Available to"
                                        options={visibilities}

                                    />
                                </div>
                            </div>
                            <div>
                                <div className={"edit-profile-field"}>
                                    <Field
                                        component={TextField}
                                        type={"password"}
                                        name={"password"}
                                        label={"Password"}
                                        fullWidth
                                    />
                                </div>
                                <div className={"edit-profile-visibility"}></div>
                            </div>
                            <div>
                                <div className={"edit-profile-field"}>
                                    <Field
                                        component={TextField}
                                        name={"phone"}
                                        label={"Phone"}
                                        fullWidth
                                    />
                                </div>
                                <div className={"edit-profile-visibility"}>
                                    <Field
                                        component={FormikAutocomplete}
                                        name="phone_visibility"
                                        label={"Available to"}
                                        options={visibilities}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={"edit-profile-field"}>
                                    <Field
                                        component={FormikAutocomplete}
                                        name="university"
                                        label="University"
                                        options={universities}
                                    />
                                </div>
                                <div className={"edit-profile-visibility"}>
                                    <Field
                                        component={FormikAutocomplete}
                                        name="university_visibility"
                                        label="Available to"
                                        options={visibilities}
                                    />
                                </div>
                            </div>
                        </div>
                        </DialogContent>
                        <DialogActions style={{justifyContent: "center"}}>
                            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={isLoading}
                                startIcon={
                                    isLoading ? <CircularProgress color="inherit" size={25} /> : <SaveIcon/>
                                }
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Form>
                }
            </Formik>
        </Dialog>
    )
}

EditProfile.propTypes = EditProfilePropTypes;

export default EditProfile;
