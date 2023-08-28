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
import FormikAutocomplete from "../FormikAutocomplete";
import Cropper from "react-cropper";
import SaveIcon from '@mui/icons-material/Save';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import ContentCutIcon from "@mui/icons-material/ContentCut";
import DeleteIcon from "@mui/icons-material/Delete";

import env from "../../config/envConfig";
import {AddArticlePropTypes} from "./addArticlePropTypes";
import './addArticle.css';
import AlertContainer from "../../containers/alert";
import SNTextarea from "../fields/SNTextarea";

const AddArticle = ({
    visibilities,
    article,
    addArticle,
    handleClose,
    onFormSubmit,
    loading,
    handleChange,
    image,
    setCropper,
    cropImage,
    croppedImage,
    deleteImage,
    message,
    visibilitiesFetching }) => {

    const schema = Yup.object().shape({
        text: Yup.string().required("Text is required"),
        visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
    })

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
                            {((image || (article?.image!==undefined&&article?.image)) && !croppedImage)&& (
                                <>
                                    <div className={"margin"}>
                                        <Cropper
                                            src={image || `${env.apiUrl}${article?.image}`}
                                            zoomable={false}
                                            scalable={false}
                                            onInitialized={instance => setCropper(instance)}
                                            rotatable={false}
                                            viewMode={1}
                                            className={"fullWidth"}
                                        />
                                    </div>
                                    <span className={"margin"}>
                                        <Button
                                            variant={"outlined"}
                                            onClick={() => cropImage(setFieldValue)}
                                            color={'success'}
                                            startIcon={<ContentCutIcon/>}
                                        >
                                            <span className={"btn-text"}>Crop image</span>
                                        </Button>
                                    </span>
                                </>
                            )}
                            {(croppedImage) &&
                                <div className={"margin"}>
                                    <img src={croppedImage} alt={"image"} className={"fullWidth"}/>
                                </div>
                            }
                            <span className={"margin"}>
                                <label htmlFor="contained-button-file" className={"file"}>
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<AddAPhotoIcon/>}
                                    >
                                        <span className={"btn-text"}>
                                            {(image || croppedImage || (article?.image !== undefined && article?.image)) ?
                                                "Change " : "Add "}
                                            image
                                        </span>
                                        <input hidden
                                               id="contained-button-file"
                                               type="file"
                                               name="avatar"
                                               onChange={handleChange}
                                        />
                                    </Button>
                                </label>
                            </span>
                            {(croppedImage || image || (article?.image !== undefined && article?.image)) &&
                                <span className={"margin"}>
                                    <Button
                                        variant={"outlined"}
                                        onClick={() => deleteImage(setFieldValue)}
                                        color={'error'}
                                        startIcon={<DeleteIcon/>}
                                    >
                                        <span className={"btn-text"}>Delete image</span>
                                    </Button>
                                </span>
                            }
                            <div className={"fields-margin"}>
                                <Field label={"Article text"} name={"text"} type={"text"} component={SNTextarea} />
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
                        <DialogActions>
                            <div className={"margin"}>
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            </div>
                            <div className={"margin"}>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress color="inherit" size={25}/> : <SaveIcon/>}
                                >
                                    {addArticle ? "Add" : "Save"}
                                </Button>
                            </div>
                        </DialogActions>
                    </Form>
                }
            </Formik>
        </Dialog>
    );
}

AddArticle.propTypes = AddArticlePropTypes;

export default AddArticle;
