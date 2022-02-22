import PropTypes from 'prop-types';
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

import './addArticle.css';
import * as Yup from "yup";
import FormikAutocomplete from "../FormikAutocomplete";
import Cropper from "react-cropper";
import env from "../../config/envConfig";

const AddArticle = ({
    visibilities,
    openModal,
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
                open={openModal}
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
                                <span>&times;</span>
                            </IconButton>
                            <DialogTitle>
                                {addArticle && "Add article"}
                                {!addArticle && "Edit article"}
                            </DialogTitle>
                            <DialogContent>
                                <ErrorMessage name="text" render={msg => <div className="error">{msg}</div>}/>
                                <label htmlFor="contained-button-file" className={"file margin"}>
                                    <Button variant="outlined" component="span">
                                        {(image||croppedImage||(article?.image!==undefined&&article?.image)) && "Change "}
                                        {(!(image||croppedImage||(article?.image!==undefined&&article?.image))) && "Add "}
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
                                    <Cropper
                                        src={image || `${env.apiUrl}${article?.image}`}
                                        zoomable={false}
                                        scalable={false}
                                        onInitialized={instance => setCropper(instance)}
                                        rotatable={false}
                                        viewMode={1}
                                        style={{width: '100%', margin: 5}}
                                    />
                                )}
                                {(image || (article?.image!==undefined&&article?.image)) &&
                                    <Button
                                        variant={"contained"}
                                        onClick={() => cropImage(setFieldValue)}
                                        color={'success'}
                                        style={{display: "block", margin: 5}}
                                    >
                                        Crop
                                    </Button>
                                }
                                {(croppedImage) &&
                                    <img src={croppedImage} width={'100%'}/>
                                }
                                {(croppedImage || image || (article?.image !== undefined && article?.image)) &&
                                    <Button
                                        variant={"contained"}
                                        onClick={() => deleteImage(setFieldValue)}
                                        color={'error'}
                                        style={{display: "block", margin: 5}}
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
                                        ) : null
                                    }
                                >
                                    {addArticle && "Add"}
                                    {!addArticle && "Save"}
                                </Button>
                            </DialogActions>
                        </Form>
                    }
                </Formik>
            </Dialog>
        </>
    );
}

AddArticle.propTypes = {
    visibilities: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
    })),
    article: PropTypes.shape({
        text: PropTypes.string.isRequired,
        visibility: PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
        }),
    }),
    addArticle: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
}

export default AddArticle;
