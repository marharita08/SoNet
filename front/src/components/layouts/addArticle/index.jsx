import React from "react";
import {Formik, Form, Field} from "formik";
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import * as Yup from "yup";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
import env from "../../../config/envConfig";
import {AddArticlePropTypes} from "./addArticlePropTypes";
import AlertContainer from "../../../containers/alert";
import SNTextarea from "../../atoms/fields/SNTextarea";
import SNCropper from "../../atoms/cropper/SNCropper";
import ImageActions from "../imageActions/ImageActions";
import {useStyles} from "../../style";
import {useTheme} from "@mui/material/styles";
import CancelButton from "../../atoms/buttons/CancelButton";
import SubmitButton from "../../atoms/buttons/SubmitButton";
import CloseButton from "../../atoms/buttons/CloseButton";

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
    const theme = useTheme();

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
                        <CloseButton onClick={handleClose}/>
                        <DialogTitle className={classes.heading}>
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
                                <img src={croppedImage} alt={"image"} className={classes.addArticleImg}/>
                            }
                            <ImageActions
                                isCropper={isCropper}
                                isImage={isImage}
                                cropImageOnClick={() => cropImage(setFieldValue)}
                                deleteImageOnclick={() => deleteImage(setFieldValue)}
                                addImageOnClick={handleChange}/>
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
                        <DialogActions sx={theme.dialogActions}>
                            <CancelButton onClick={handleClose}/>
                            <SubmitButton isLoading={isLoading} isAdd={addArticle}/>
                        </DialogActions>
                    </Form>
                }
            </Formik>
        </Dialog>
    );
};

AddArticle.propTypes = AddArticlePropTypes;

export default AddArticle;
