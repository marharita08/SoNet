import {Form, Formik} from "formik";
import {Dialog} from "@mui/material";
import React from "react";
import {EditProfilePropTypes} from "./editProfilePropTypes";
import {schema} from "./editProfileSchema";
import SaveCancelDialogActions from "../dialogActions/SaveCancelDialogActions";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import SNDialogTitle from "../../atoms/dialogTitle/SNDialogTitle";
import EditProfileContent from "./EditProfileContent";
import ErrorAlert from "../../atoms/alert/ErrorAlert";
import ErrorBoundary from "../../ErrorBoundary";

const EditProfileComponent = ({
    universities,
    visibilities,
    onFormSubmit,
    isLoading,
    image,
    croppedImage,
    handleDeleteImage,
    handleCropImage,
    handleAddImage,
    setCropper,
    isModalOpen,
    handleModalClose,
    user,
    isFetching,
    errorMessage,
    handleAlertClose
}) => {

    return (
        <ErrorBoundary>
            <Dialog
                open={isModalOpen}
                onClose={handleModalClose}
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
                            <CloseIconBtn onClick={handleModalClose}/>
                            <SNDialogTitle title={"Edit profile"}/>
                            <ErrorAlert message={errorMessage} handleClose={handleAlertClose}/>
                            <EditProfileContent
                                handleChange={handleAddImage}
                                setFieldValue={setFieldValue}
                                setCropper={setCropper}
                                visibilities={visibilities}
                                isLoading={isFetching}
                                user={user}
                                universities={universities}
                                croppedImage={croppedImage}
                                image={image}
                                cropImage={handleCropImage}
                                deleteImage={handleDeleteImage}
                            />
                            <SaveCancelDialogActions cancelOnClick={handleModalClose} isLoading={isLoading}/>
                        </Form>
                    }
                </Formik>
            </Dialog>
        </ErrorBoundary>
    );
};

EditProfileComponent.propTypes = EditProfilePropTypes;

export default EditProfileComponent;
