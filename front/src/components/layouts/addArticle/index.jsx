import React from "react";
import {Formik, Form, Field} from "formik";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import * as Yup from "yup";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import env from "../../../config/envConfig";
import {AddArticlePropTypes} from "./addArticlePropTypes";
import "./addArticle.css";
import AlertContainer from "../../../containers/alert";
import SNTextarea from "../../atoms/fields/SNTextarea";
import SNCropper from "../../atoms/cropper/SNCropper";
import ImageActions from "../imageActions/ImageActions";

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

    const schema = Yup.object().shape({
        text: Yup.string().required("Text is required"),
        visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
    });

    const isCropper = Boolean((image || (article?.image !== undefined && article?.image)) && !croppedImage);
    const isImage = Boolean(image || croppedImage || (article?.image !== undefined && article?.image));

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
                        <IconButton className="closebtn margin" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                        <DialogTitle className={"heading"}>
                            {addArticle ? "Add article" : "Edit article"}
                        </DialogTitle>
                        <AlertContainer alertMessage={message}/>
                        <DialogContent>
                            {
                                isCropper &&
                                <SNCropper image={image || `${env.apiUrl}${article?.image}`} setCropper={setCropper}/>
                            }
                            {
                                croppedImage &&
                                <div className={"margin"}>
                                    <img src={croppedImage} alt={"image"} className={"full-width"}/>
                                </div>
                            }
                            <ImageActions
                                isCropper={isCropper}
                                isImage={isImage}
                                cropImageOnClick={() => cropImage(setFieldValue)}
                                deleteImageOnclick={() => deleteImage(setFieldValue)}
                                addImageOnClick={handleChange}/>
                            <div className={"fields-margin"}>
                                <Field label={"Article text"} name={"text"} type={"text"} component={SNTextarea}/>
                            </div>
                            <div className={"margin"}>
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
                        <DialogActions style={{justifyContent: "center"}}>
                            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            <Button
                                type={"submit"}
                                variant="contained"
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress color="inherit" size={25}/> : <SaveIcon/>}
                            >
                                {addArticle ? "Add" : "Save"}
                            </Button>
                        </DialogActions>
                    </Form>
                }
            </Formik>
        </Dialog>
    );
};

AddArticle.propTypes = AddArticlePropTypes;

export default AddArticle;
