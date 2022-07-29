import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
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
    message
}) => {

    const schema = Yup.object().shape({
        text: Yup.string().required("Text is required"),
        visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
    })

    return (
        <>
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
                            <DialogTitle>
                                {addArticle ? "Add article" : "Edit article"}
                            </DialogTitle>
                            <AlertContainer alertMessage={message}/>
                            <DialogContent>
                                <ErrorMessage name="text" render={msg => <div className="error">{msg}</div>}/>
                                <label htmlFor="contained-button-file" className={"file margin"}>
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<AddAPhotoIcon/>}
                                    >
                                        {(image||croppedImage||(article?.image!==undefined&&article?.image)) ? "Change " : "Add "}
                                        image
                                        <input hidden
                                               id="contained-button-file"
                                               type="file"
                                               name="avatar"
                                               onChange={handleChange}
                                        />
                                    </Button>
                                </label>
                                {((image || (article?.image!==undefined&&article?.image)) && !croppedImage)&& (
                                    <div>
                                        <Cropper
                                            src={image || `${env.apiUrl}${article?.image}`}
                                            zoomable={false}
                                            scalable={false}
                                            onInitialized={instance => setCropper(instance)}
                                            rotatable={false}
                                            viewMode={1}
                                            style={{width: '100%', margin: 5}}
                                        />
                                        <Button
                                            variant={"outlined"}
                                            onClick={() => cropImage(setFieldValue)}
                                            color={'success'}
                                            style={{ margin: 5}}
                                            startIcon={<ContentCutIcon/>}
                                        >
                                            Crop image
                                        </Button>
                                    </div>

                                )}
                                {(croppedImage) &&
                                    <img src={croppedImage} width={'100%'}/>
                                }
                                {(croppedImage || image || (article?.image !== undefined && article?.image)) &&
                                    <Button
                                        variant={"outlined"}
                                        onClick={() => deleteImage(setFieldValue)}
                                        color={'error'}
                                        style={{margin: 5}}
                                        startIcon={<DeleteIcon/>}
                                    >
                                        Delete image
                                    </Button>
                                }
                                <Field as={"textarea"} name={"text"}/>
                                <div align={"center"}>
                                    <div className={"available"}>
                                        <div className={"margin"} align={"left"}>
                                            <Field
                                                component={FormikAutocomplete}
                                                name="visibility"
                                                label={"Available to"}
                                                options={visibilities}
                                                className={"visibility"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button sx={{margin: "5px"}} variant="outlined" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    sx={{margin: "5px"}}
                                    type={"submit"}
                                    variant="contained"
                                    disabled={loading}
                                    startIcon={
                                        loading ? (
                                            <CircularProgress color="inherit" size={25}/>
                                        ) : <SaveIcon/>
                                    }
                                >
                                    {addArticle ? "Add" : "Save"}
                                </Button>
                            </DialogActions>
                        </Form>
                    }
                </Formik>
            </Dialog>
        </>
    );
}

AddArticle.propTypes = AddArticlePropTypes;

export default AddArticle;
