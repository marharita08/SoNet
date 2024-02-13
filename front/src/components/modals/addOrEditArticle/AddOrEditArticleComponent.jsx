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

const AddOrEditArticleComponent = ({visibilities, article, image, croppedImage, actions, flags}) => {

  const {handleModalClose, handleFormSubmit, ...contentActions} = actions;
  const {isAdd, isLoading, isVisibilitiesFetching} = flags;

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
                actions={{...contentActions, setFieldValue}}
                image={image}
                visibilities={visibilities}
                isVisibilitiesFetching={isVisibilitiesFetching}
                croppedImage={croppedImage}
                article={article}
              />
              <SaveCancelDialogActions
                cancelOnClick={handleModalClose}
                flags={{isAdd, isLoading}}
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
