import React from "react";
import {Formik, Form} from "formik";
import {Dialog} from "@mui/material";
import {addArticlePropTypes, addArticleDefaultProps} from "./addArticlePropTypes";
import AlertContainer from "../../../containers/alert";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import SaveCancelDialogActions from "../dialogActions/SaveCancelDialogActions";
import {schema} from "./addArticleSchema";
import SNDialogTitle from "../../atoms/dialogTitle/SNDialogTitle";
import AddArticleContent from "./AddArticleContent";

const AddArticle = ({
    visibilities,
    article,
    addArticle,
    handleClose,
    onFormSubmit,
    isLoading,
    handleChange,
    image,
    setCropper,
    cropImage,
    croppedImage,
    deleteImage,
    message,
    visibilitiesFetching
}) => {

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <Formik
                initialValues={article}
                onSubmit={onFormSubmit}
                validationSchema={schema}
            >
                {({setFieldValue, handleSubmit}) =>
                    <Form onSubmit={handleSubmit}>
                        <CloseIconBtn onClick={handleClose}/>
                        <SNDialogTitle title={addArticle ? "Add article" : "Edit article"}/>
                        <AlertContainer alertMessage={message}/>
                        <AddArticleContent
                            handleChange={handleChange}
                            deleteImage={deleteImage}
                            setCropper={setCropper}
                            cropImage={cropImage}
                            image={image}
                            visibilities={visibilities}
                            visibilitiesFetching={visibilitiesFetching}
                            croppedImage={croppedImage}
                            article={article}
                            setFieldValue={setFieldValue}
                        />
                        <SaveCancelDialogActions
                            cancelOnClick={handleClose}
                            isAdd={addArticle}
                            isLoading={isLoading}
                        />
                    </Form>
                }
            </Formik>
        </Dialog>
    );
};

AddArticle.propTypes = addArticlePropTypes;
AddArticle.defaultProps = addArticleDefaultProps;

export default AddArticle;
