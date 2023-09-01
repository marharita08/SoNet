import React from "react";
import {Formik, Form, Field} from "formik";
import {CircularProgress, Dialog, DialogContent} from "@mui/material";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
import env from "../../../config/envConfig";
import {AddArticlePropTypes} from "./addArticlePropTypes";
import AlertContainer from "../../../containers/alert";
import SNTextarea from "../../atoms/fields/SNTextarea";
import SNCropper from "../../atoms/cropper/SNCropper";
import ImageDialogActions from "../dialogActions/ImageDialogActions";
import {useStyles} from "../../style";
import CloseButton from "../../atoms/buttons/CloseButton";
import SaveCancelDialogActions from "../dialogActions/SaveCancelDialogActions";
import {schema} from "./addArticleSchema";
import SNDialogTitle from "../../atoms/dialogTitle/SNDialogTitle";

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

    const classes = useStyles();

    const isCropper = !!((image || (article?.image !== undefined && article?.image)) && !croppedImage);
    const isImage = !!(image || croppedImage || (article?.image !== undefined && article?.image));

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
                        <CloseButton onClick={handleClose}/>
                        <SNDialogTitle title={addArticle ? "Add article" : "Edit article"}/>
                        <AlertContainer alertMessage={message}/>
                        <DialogContent>
                            <SNCropper
                                image={image || `${env.apiUrl}${article?.image}`}
                                setCropper={setCropper}
                                isVisible={isCropper}
                            />
                            {
                                croppedImage &&
                                <img src={croppedImage} alt={"image"} className={classes.addArticleImg}/>
                            }
                            <ImageDialogActions
                                isCropper={isCropper}
                                isImage={isImage}
                                cropImageOnClick={() => cropImage(setFieldValue)}
                                deleteImageOnclick={() => deleteImage(setFieldValue)}
                                addImageOnClick={handleChange}
                            />
                            <div className={classes.addArticleField}>
                                <Field label={"Article text"} name={"text"} type={"text"} component={SNTextarea}/>
                            </div>
                            <div className={classes.addArticleField}>
                                {
                                    visibilitiesFetching ? <CircularProgress color="inherit" size={25}/> :
                                        <Field
                                            component={FormikAutocomplete}
                                            name="visibility"
                                            label={"Available to"}
                                            options={visibilities}
                                        />
                                }
                            </div>
                        </DialogContent>
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

AddArticle.propTypes = AddArticlePropTypes;

export default AddArticle;
