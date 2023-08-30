import React from "react";
import {Avatar, Button, CircularProgress, Divider} from "@mui/material";
import * as Yup from "yup";
import {Formik, Form, Field} from "formik";
import PropTypes from "prop-types";
import SaveIcon from "@mui/icons-material/Save";
import SNTextarea from "../fields/SNTextarea";
import {useStyles as useAvatarStyles} from "../avatarSize";
import "./addComent.css";

const AddComment = ({user, comment, onSubmit, loading, addComment, handleCancel}) => {
    const avatarSize = useAvatarStyles();

    const schema = Yup.object().shape({
        text: Yup.string().required("Text is required")
    });

    return (
        <>
            <Divider/>
            <Formik
                enableReinitialize
                initialValues={comment}
                onSubmit={onSubmit}
                validationSchema={schema}
            >
                {({handleSubmit}) =>
                    <Form onSubmit={handleSubmit}>
                        <div className={"avatar-container"}>
                            <Avatar
                                src={user.avatar}
                                className={"margin " + avatarSize.lg}
                            />
                        </div>
                        <div className={"inline comment-field-container"}>
                            {
                                comment.to &&
                                <div className={"margin"}>
                                    Reply to: {comment.to}
                                    <div className={"reply-to-text"}>
                                        {comment.parent_text}
                                    </div>
                                </div>
                            }
                            <div className={"margin"}>
                                <Field
                                    label={"Comment"}
                                    type={"text"}
                                    name={"text"}
                                    component={SNTextarea}
                                />
                            </div>
                            {
                                (!addComment || comment.level !== 1) &&
                                <div className={"inline margin"}>
                                    <Button variant={"outlined"} onClick={handleCancel}>Cancel</Button>
                                </div>
                            }
                            <div className={"inline margin"}>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    disabled={loading}
                                    startIcon={
                                        loading ? (
                                            <CircularProgress color="inherit" size={25}/>
                                        ) : <SaveIcon/>
                                    }
                                >
                                    {addComment ? "Add" : "Save"}
                                </Button>
                            </div>
                        </div>
                    </Form>
                }
            </Formik>
        </>
    );
};

AddComment.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string
    }),
    comment: PropTypes.shape({
        level: PropTypes.number.isRequired,
        to: PropTypes.string,
        text: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        parent_id: PropTypes.number,
    }),
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    addComment: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired
};

export default AddComment;
