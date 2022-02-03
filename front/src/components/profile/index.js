import * as Yup from 'yup';
import { Formik, Form, Field} from 'formik';
import {MenuItem, Button, Avatar, CircularProgress} from "@mui/material";
import { TextField, Select } from 'formik-mui';

import './profile.css';
import {ProfilePropTypes} from "./profilePropTypes";
import env from "../../config/envConfig";
import {useState} from "react";
import {updateUser} from "../../containers/api/usersCrud";
import {useMutation} from "react-query";

const Profile = ({user, universities, visibilities}) => {

    if (!user.university_id) {
        user.university_id = 0;
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required").max(255, "Mast be no more than 255 symbols"),
        name_visibility_id: Yup.number().min(1).max(visibilities.length),
        email: Yup.string().required("Email is required"),
        email_visibility_id: Yup.number().min(1).max(visibilities.length),
        phone: Yup.string().required("Phone number is required").matches(/^[+]380[\d]{9}$/, "Must match +380xxxxxxxxx"),
        phone_visibility_id: Yup.number().min(1).max(visibilities.length),
        university_id: Yup.number().min(0).max(universities.length),
        university_visibility_id: Yup.number().min(1).max(visibilities.length),
    })

    const { mutate, isLoading } = useMutation(
        updateUser, {
            onSuccess: data => {
                console.log(data);
                alert(data.data)
            },
            onError: () => {
                alert("Updating was failed.");
            }
        });

    const onFormSubmit = (data) => {
        console.log(data);
        let formData = new FormData();
        for ( var key in data ) {
            formData.append(key, data[key]);
        }
        mutate(data);
    }

    const [imgState, setImgState] = useState({
        path: "",
    });

    return (
        <>
            <h1 className={"big_margin"}>My profile</h1>
            <Formik
                initialValues={user}
                onSubmit={onFormSubmit}
                validationSchema={schema}
            >
                {({ setFieldValue }) =>
                    <Form>
                        <div className={"inline big_margin"}>
                            <div className={"fields_margin"}>
                                <Field component={TextField} type={"text"} name={"name"} label={"Name"}/>
                                <Field component={Select} className={"visibility"} name={"name_visibility_id"} label={"Available to"}>
                                    {visibilities?.map((visibility, i) =>
                                        <MenuItem key={i} value={visibility.visibility_id}>{visibility.visibility}</MenuItem>
                                    )}
                                </Field>
                            </div>
                            <div className={"fields_margin"}>
                                <Field component={TextField} type={"email"} name={"email"} disabled label={"Email"}/>
                                <Field component={Select} className={"visibility"} name={"email_visibility_id"} label={"Available to"}>
                                    {visibilities?.map((visibility, i) =>
                                        <MenuItem key={i} value={visibility.visibility_id}>{visibility.visibility}</MenuItem>
                                    )}
                                </Field>
                            </div>
                            <div className={"fields_margin"}>
                                <Field component={TextField} name={"phone"} label={"phone"}/>
                                <Field component={Select}  className={"visibility"} name={"phone_visibility_id"} label={"Available to"}>
                                    {visibilities?.map((visibility, i) =>
                                        <MenuItem key={i} value={visibility.visibility_id}>{visibility.visibility}</MenuItem>
                                    )}
                                </Field>
                            </div>
                            <div className={"fields_margin"}>
                                <Field component={Select} className={"university"} name={"university_id"} label={"University"}>
                                    <MenuItem value={"0"}>Not chosen</MenuItem>
                                    {universities?.map((university, i) =>
                                        <MenuItem key={i} value={university.university_id}>{university.name}</MenuItem>
                                    )}
                                </Field>
                                <Field component={Select} className={"visibility"} name={"university_visibility_id"} label={"Available to"}>
                                    {visibilities?.map((visibility, i) =>
                                        <MenuItem key={i} value={visibility.visibility_id}>{visibility.visibility}</MenuItem>
                                    )}
                                </Field>
                            </div>
                            <div align={"center"}>
                                <Button
                                    variant="contained"
                                    type={"submit"}
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
                        <div className={"user_img"}>
                            <Avatar alt={"user image"}
                                className={"big_margin"}
                                src={imgState?.path||`${env.apiUrl}${user.avatar}`}
                                sx={{ width: 100, height: 100 }}/>
                            <label htmlFor="contained-button-file" className={"file"}>
                                <Button variant="outlined" component="span">
                                    Change avatar
                                    <input hidden
                                           id="contained-button-file"
                                           type="file"
                                           name="avatar"
                                           onChange={(event) => {
                                               setFieldValue("file", event.currentTarget.files[0]);
                                               setImgState({
                                                   ...imgState,
                                                   path: URL.createObjectURL(event.currentTarget.files[0]),
                                               });
                                           }}
                                    />
                                </Button>
                            </label>
                        </div>
                    </Form>
                }
            </Formik>
        </>
    );
}

Profile.propTypes = ProfilePropTypes;

export default Profile;
