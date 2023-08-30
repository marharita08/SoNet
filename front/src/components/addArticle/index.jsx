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
import FormikAutocomplete from "../fields/FormikAutocomplete";
import Cropper from "react-cropper";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import env from "../../config/envConfig";
import {AddArticlePropTypes} from "./addArticlePropTypes";
import "./addArticle.css";
import AlertContainer from "../../containers/alert";
import SNTextarea from "../fields/SNTextarea";
import CropImageBtn from "../buttons/CropImageBtn";
import DeleteImageBtn from "../buttons/DeleteImageBtn";
import AddImageBtn from "../buttons/AddImageBtn";

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
                            {((image || (article?.image !== undefined && article?.image)) && !croppedImage) && (
                                <div className={"margin"}>
                                    <Cropper
                                        src={image || `${env.apiUrl}${article?.image}`}
                                        zoomable={false}
                                        scalable={false}
                                        onInitialized={instance => setCropper(instance)}
                                        rotatable={false}
                                        viewMode={1}
                                        className={"full-width"}
                                    />
                                </div>
                            )}
                            {(croppedImage) &&
                                <div className={"margin"}>
                                    <img src={croppedImage} alt={"image"} className={"full-width"}/>
                                </div>
                            }
                            <DialogActions style={{justifyContent: "center"}}>
                                <AddImageBtn
                                    onChange={handleChange}
                                    isImage={(image || croppedImage || (article?.image !== undefined && article?.image))}
                                />
                                {((image || (article?.image !== undefined && article?.image)) && !croppedImage) &&
                                    <CropImageBtn onClick={() => cropImage(setFieldValue)}/>}
                                {(croppedImage || image || (article?.image !== undefined && article?.image)) &&
                                    <DeleteImageBtn onClick={() => deleteImage(setFieldValue)}/>}
                            </DialogActions>
                            <div className={"fields-margin"}>
                                <Field label={"Article text"} name={"text"} type={"text"} component={SNTextarea}/>
                            </div>
                            <div className={"margin"}>
                                {visibilitiesFetching ? <CircularProgress color="inherit" size={25}/> :
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
