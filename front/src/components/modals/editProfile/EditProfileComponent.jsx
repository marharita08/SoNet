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

const EditProfileComponent = ({universities, visibilities, image, croppedImage, user, locations, actions, flags}) => {

  const {onFormSubmit,  handleModalClose, ...contentActions} = actions;
  const {handleDeleteImage, handleCropImage, handleAddImage, ...rest} = contentActions;
  const {isLoading, isModalOpen, isFetching} = flags;

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
                actions={{
                  setFieldValue, ...rest,
                  handleChange: handleAddImage,
                  cropImage: handleCropImage,
                  deleteImage: handleDeleteImage
                }}
                visibilities={visibilities}
                isLoading={isFetching}
                user={user}
                universities={universities}
                croppedImage={croppedImage}
                image={image}
                locations={locations}
              />
              <SaveCancelDialogActions cancelOnClick={handleModalClose} flags={{isLoading}}/>
            </Form>
          }
        </Formik>
      </Dialog>
    </ErrorBoundary>
  );
};

EditProfileComponent.propTypes = EditProfilePropTypes;

export default EditProfileComponent;
