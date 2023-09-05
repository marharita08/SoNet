import {Form, Formik} from "formik";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
import {Avatar, Dialog, DialogContent} from "@mui/material";
import React from "react";
import {EditProfilePropTypes} from "./editProfilePropTypes";
import AlertContainer from "../../../containers/alert";
import Loading from "../../atoms/loading";
import {useTheme} from "@mui/material/styles";
import SNCropper from "../../atoms/cropper/SNCropper";
import ImageDialogActions from "../dialogActions/ImageDialogActions";
import {schema} from "./editProfileSchema";
import SaveCancelDialogActions from "../dialogActions/SaveCancelDialogActions";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import {useStyles} from "./style";
import SNDialogTitle from "../../atoms/dialogTitle/SNDialogTitle";
import EditProfileFieldRow from "./EditProfileFieldRow";

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

    const classes = useStyles();
    const theme = useTheme();
    const isCropper = !!image;

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
                        <CloseIconBtn onClick={handleClose}/>
                        <SNDialogTitle title={"Edit profile"}/>
                        <AlertContainer alertMessage={message} handleClose={handleAlertClose}/>
                        <DialogContent>
                            <Loading isLoading={isFetching}/>
                            <Avatar
                                className={classes.avatar}
                                src={croppedImage || user?.avatar}
                                sx={theme.avatarSizes.xl}
                            />
                            <SNCropper image={image} setCropper={setCropper} isVisible={isCropper}/>
                            <ImageDialogActions
                                isCropper={isCropper}
                                isImage={!!(croppedImage || image)}
                                cropImageOnClick={() => cropImage(setFieldValue)}
                                deleteImageOnclick={() => deleteImage(setFieldValue)}
                                addImageOnClick={handleChange}
                            />
                            <div className={classes.fieldsContainer}>
                                <EditProfileFieldRow
                                    fieldName={"name"}
                                    fieldLabel={"Name"}
                                />
                                <EditProfileFieldRow
                                    fieldName={"email"}
                                    fieldLabel={"Email"}
                                    fieldType={"email"}
                                    visibilityName={"email_visibility"}
                                    visibilities={visibilities}
                                />
                                <EditProfileFieldRow
                                    fieldName={"password"}
                                    fieldLabel={"Password"}
                                    fieldType={"password"}
                                />
                                <EditProfileFieldRow
                                    fieldName={"phone"}
                                    fieldLabel={"Phone"}
                                    visibilityName={"phone_visibility"}
                                    visibilities={visibilities}
                                />
                                <EditProfileFieldRow
                                    fieldName={"university"}
                                    fieldLabel={"University"}
                                    fieldComponent={FormikAutocomplete}
                                    fieldOptions={universities}
                                    visibilityName={"university_visibility"}
                                    visibilities={visibilities}
                                />
                            </div>
                        </DialogContent>
                        <SaveCancelDialogActions cancelOnClick={handleClose} isLoading={isLoading}/>
                    </Form>
                }
            </Formik>
        </Dialog>
    );
};

EditProfile.propTypes = EditProfilePropTypes;

export default EditProfile;
