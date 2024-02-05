import React from "react";
import {Formik, Form} from "formik";
import {Dialog} from "@mui/material";
import {addOrEditArticlePropTypes, addOrEditArticleDefaultProps} from "./addOrEditArticlePropTypes";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import SaveCancelDialogActions from "../dialogActions/SaveCancelDialogActions";
import {schema} from "./addOrEditArticleSchema";
import SNDialogTitle from "../../atoms/dialogTitle/SNDialogTitle";
import AddOrEditArticleContent from "./AddOrEditArticleContent";
import ErrorBoundary from "../../ErrorBoundary";

const AddOrEditArticleComponent = ({
  visibilities,
  article,
  isAdd,
  handleModalClose,
  handleFormSubmit,
  isLoading,
  handleAddImage,
  image,
  setCropper,
  handleCropImage,
  croppedImage,
  handleDeleteImage,
  isVisibilitiesFetching
}) => {

  return (
    <ErrorBoundary>
      <Dialog
        open={true}
        onClose={handleModalClose}
        fullWidth
        maxWidth="sm"
      >
        <Formik
          initialValues={article}
          onSubmit={handleFormSubmit}
          validationSchema={schema}
        >
          {({setFieldValue, handleSubmit}) =>
            <Form onSubmit={handleSubmit}>
              <CloseIconBtn onClick={handleModalClose}/>
              <SNDialogTitle title={isAdd ? "Add article" : "Edit article"}/>
              <AddOrEditArticleContent
                handleAddImage={handleAddImage}
                handleDeleteImage={handleDeleteImage}
                setCropper={setCropper}
                handleCropImage={handleCropImage}
                image={image}
                visibilities={visibilities}
                isVisibilitiesFetching={isVisibilitiesFetching}
                croppedImage={croppedImage}
                article={article}
                setFieldValue={setFieldValue}
              />
              <SaveCancelDialogActions
                cancelOnClick={handleModalClose}
                isAdd={isAdd}
                isLoading={isLoading}
              />
            </Form>
          }
        </Formik>
      </Dialog>
    </ErrorBoundary>
  );
};

AddOrEditArticleComponent.propTypes = addOrEditArticlePropTypes;
AddOrEditArticleComponent.defaultProps = addOrEditArticleDefaultProps;

export default AddOrEditArticleComponent;
