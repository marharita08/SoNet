import {Form, Formik} from "formik";
import {Dialog} from "@mui/material";
import React from "react";

import {EditProfilePropTypes} from "./propTypes/editProfilePropTypes";
import {schema} from "./editProfileSchema";
import SaveCancelDialogActions from "../dialogActions/SaveCancelDialogActions";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import SNDialogTitle from "../../atoms/dialogTitle/SNDialogTitle";
import EditProfileContent from "./EditProfileContent";
import ErrorBoundary from "../../ErrorBoundary";

const EditProfileComponent = ({data, actions, flags}) => {

  const {onFormSubmit,  handleModalClose, ...contentActions} = actions;
  const {isLoading, isModalOpen, isFetching} = flags;
  const {user} = data;

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
                actions={{setFieldValue, ...contentActions}}
                isLoading={isFetching}
                data={data}
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
