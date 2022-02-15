import * as Yup from 'yup';
import { Formik, Form, Field} from 'formik';
import { Button, Avatar, CircularProgress} from "@mui/material";
import { TextField } from 'formik-mui';

import './profile.css';
import {ProfilePropTypes} from "./profilePropTypes";
import env from "../../config/envConfig";
import FormikAutocomplete from "../FormikAutocomplete";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const Profile = ({
    user,
    universities,
    visibilities,
    onFormSubmit,
    isLoading,
    image,
    croppedImage,
    deleteImage,
    cropImage,
    handleChange,
    setCropper,
}) => {

    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required").max(255, "Mast be no more than 255 symbols"),
        name_visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
        email: Yup.string().required("Email is required"),
        email_visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
        phone: Yup.string().required("Phone number is required").matches(/^[+]380[\d]{9}$/, "Must match +380xxxxxxxxx"),
        phone_visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
        university: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable(),
        university_visibility: Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        }).nullable()
    })


    return (
        <>
            <h1 className={"big_margin"}>My profile</h1>
            <Formik
                initialValues={user}
                onSubmit={onFormSubmit}
                validationSchema={schema}
            >
                {({ setFieldValue, handleSubmit }) =>
                    <Form onSubmit={handleSubmit}>
                        <div className={"inline big_margin"}>
                            <div className={"fields_margin"}>
                                <Field
                                    component={TextField}
                                    type={"text"}
                                    name={"name"}
                                    label={"Name"}
                                    className={"inline fields_width fields_height"}
                                />
                                <Field
                                    component={FormikAutocomplete}
                                    name="name_visibility"
                                    label={"Available to"}
                                    options={visibilities}
                                    className={"inline visibility fields_height"}
                                />
                            </div>
                            <div className={"fields_margin"}>
                                <Field
                                    component={TextField}
                                    type={"email"}
                                    name={"email"}
                                    disabled
                                    label={"Email"}
                                    className={"inline fields_width fields_height"}
                                />
                                <Field
                                    component={FormikAutocomplete}
                                    name="email_visibility"
                                    label="Available to"
                                    options={visibilities}
                                    className={"inline visibility fields_height"}
                                />
                            </div>
                            <div className={"fields_margin"}>
                                <Field
                                    component={TextField}
                                    name={"phone"}
                                    label={"Phone"}
                                    className={"inline fields_width fields_height"}
                                />
                                <Field
                                    component={FormikAutocomplete}
                                    name="phone_visibility"
                                    label={"Available to"}
                                    options={visibilities}
                                    className={"inline visibility fields_height"}
                                />
                            </div>
                            <div className={"fields_margin"}>
                                <Field
                                    component={FormikAutocomplete}
                                    name="university"
                                    label="University"
                                    options={universities}
                                    className={"inline fields_width fields_height"}
                                />
                                <Field
                                    component={FormikAutocomplete}
                                    name="university_visibility"
                                    label="Available to"
                                    options={visibilities}
                                    className={"inline visibility fields_height"}
                                />
                            </div>
                            <div align={"center"}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoading}
                                    startIcon={
                                        isLoading ? (
                                            <CircularProgress color="inherit" size={25} />
                                        ) : null
                                    }
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                        <div className={"user_img"} >
                            <Avatar
                                alt={user?.name}
                                className={"big_margin"}
                                src={croppedImage||`${env.apiUrl}${user?.avatar}`}
                                sx={{ width: 100, height: 100 }}
                            />
                            <label htmlFor="contained-button-file" className={"file margin"}>
                                <Button variant="outlined" component="span">
                                    Change avatar
                                    <input hidden
                                           id="contained-button-file"
                                           type="file"
                                           name="avatar"
                                           onChange={handleChange}
                                    />
                                </Button>
                            </label>
                            {image &&
                                <Button
                                    variant={"contained"}
                                    onClick={ () => cropImage(setFieldValue) }
                                    color={'success'}
                                    style={{display: "block", margin: 5}}
                                >
                                    Crop
                                </Button>
                            }
                            {(croppedImage||image) &&
                                <Button
                                    variant={"contained"}
                                    onClick={() => deleteImage(setFieldValue)}
                                    color={'error'}
                                    style={{display: "block", margin: 5}}
                                >
                                    Delete image
                                </Button>
                            }
                        </div>
                        <div className={"inline"}>
                            {image && (
                                <Cropper
                                    src={image}
                                    zoomable={false}
                                    scalable={false}
                                    onInitialized={instance => setCropper(instance)}
                                    rotatable={false}
                                    viewMode={1}
                                    style={{ height: 400, width: 400, margin: 5 }}
                                />
                            )}
                        </div>
                    </Form>
                }
            </Formik>
        </>
    );
}

Profile.propTypes = ProfilePropTypes;

export default Profile;
