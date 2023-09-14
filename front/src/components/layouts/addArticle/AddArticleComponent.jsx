import React from "react";
import {Formik, Form} from "formik";
import {Dialog} from "@mui/material";
import {addArticlePropTypes, addArticleDefaultProps} from "./addArticlePropTypes";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import SaveCancelDialogActions from "../dialogActions/SaveCancelDialogActions";
import {schema} from "./addArticleSchema";
import SNDialogTitle from "../../atoms/dialogTitle/SNDialogTitle";
import AddArticleContent from "./AddArticleContent";
import ErrorBoundary from "../../ErrorBoundary";
import ErrorAlert from "../../atoms/alert/ErrorAlert";

const AddArticleComponent = ({
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
    errorMessage,
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
                            <ErrorAlert message={errorMessage}/>
                            <AddArticleContent
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

AddArticleComponent.propTypes = addArticlePropTypes;
AddArticleComponent.defaultProps = addArticleDefaultProps;

export default AddArticleComponent;
