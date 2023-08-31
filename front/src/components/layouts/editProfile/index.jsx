import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
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
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import {EditProfilePropTypes} from "./editProfilePropTypes";
import AlertContainer from "../../../containers/alert";
import Loading from "../../atoms/loading";
import "./editProfile.css";
import {useTheme} from "@mui/material/styles";
import SNCropper from "../../atoms/cropper/SNCropper";
import ImageActions from "../imageActions/ImageActions";
import {schema} from "./editProfileSchema";

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
    handleAlertClose
}) => {

    const theme = useTheme();

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
                {({setFieldValue, handleSubmit}) =>
                    <Form onSubmit={handleSubmit}>
                        <IconButton className="closebtn margin" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                        <DialogTitle className={"heading"}>Edit profile</DialogTitle>
                        <AlertContainer alertMessage={message} handleClose={handleAlertClose}/>
                        <DialogContent>
                            <Loading isLoading={isFetching}/>
                            <Avatar
                                className={"edit-profile-avatar"}
                                src={croppedImage || user?.avatar}
                                sx={theme.avatarSizes.xl}
                            />
                            {image && <SNCropper image={image} setCropper={setCropper} />}
                            <ImageActions
                                isCropper={Boolean(image)}
                                isImage={Boolean(croppedImage || image)}
                                cropImageOnClick={() => cropImage(setFieldValue)}
                                deleteImageOnclick={() => deleteImage(setFieldValue)}
                                addImageOnClick={handleChange}/>
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
                                    isLoading ? <CircularProgress color="inherit" size={25}/> : <SaveIcon/>
                                }
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Form>
                }
            </Formik>
        </Dialog>
    );
};

EditProfile.propTypes = EditProfilePropTypes;

export default EditProfile;
