import {Form, Formik} from "formik";
import {Dialog} from "@mui/material";
import React from "react";
import {EditProfilePropTypes} from "./editProfilePropTypes";
import AlertContainer from "../../../containers/alert";
import {schema} from "./editProfileSchema";
import SaveCancelDialogActions from "../dialogActions/SaveCancelDialogActions";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import SNDialogTitle from "../../atoms/dialogTitle/SNDialogTitle";
import EditProfileContent from "./EditProfileContent";

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
                        <EditProfileContent
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            setCropper={setCropper}
                            visibilities={visibilities}
                            isLoading={isFetching}
                            user={user}
                            universities={universities}
                            croppedImage={croppedImage}
                            image={image}
                            cropImage={cropImage}
                            deleteImage={deleteImage}
                        />
                        <SaveCancelDialogActions cancelOnClick={handleClose} isLoading={isLoading}/>
                    </Form>
                }
            </Formik>
        </Dialog>
    );
};

EditProfile.propTypes = EditProfilePropTypes;

export default EditProfile;
