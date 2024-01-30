import {Form, Formik} from "formik";
import {Dialog} from "@mui/material";
import React from "react";
import {EditProfilePropTypes} from "./editProfilePropTypes";
import {schema} from "./editProfileSchema";
import SaveCancelDialogActions from "../dialogActions/SaveCancelDialogActions";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import SNDialogTitle from "../../atoms/dialogTitle/SNDialogTitle";
import EditProfileContent from "./EditProfileContent";
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
    countries,
    states,
    onCountryChange,
    cities,
    onStateChange
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
                                countries={countries}
                                states={states}
                                onCountryChange={onCountryChange}
                                cities={cities}
                                onStateChange={onStateChange}
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
