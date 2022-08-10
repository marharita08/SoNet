import React from "react";
import {Avatar, Button, Card, CircularProgress, Link} from "@mui/material";
import * as Yup from "yup";
import {Formik, Form, Field} from "formik";
import PropTypes from "prop-types";
import SaveIcon from '@mui/icons-material/Save';

const AddComment = ({user, comment, onSubmit, loading, addComment, handleCancel}) => {

    const schema = Yup.object().shape({
        text: Yup.string().required("Text is required")
    });

    return (
        <Card sx={{ maxWidth: 1000 }}>
            <Formik
                enableReinitialize
                initialValues={comment}
                onSubmit={onSubmit}
                validationSchema={schema}
            >
                {({handleSubmit}) =>
                    <Form onSubmit={handleSubmit}>
                        <div className={'inline'} style={{verticalAlign: 'top'}}>
                            <Link to={`/profile/${user.user_id}`}>
                                <Avatar
                                    src={user.avatar}
                                    sx={{width: 60, height: 60}}
                                    className={'margin'}
                                />
                            </Link>
                        </div>
                        <div className={'inline'}>
                            {
                                comment.to &&
                                <div className={'margin'}>
                                    Reply to: {comment.to}
                                    <div style={{fontStyle: "italic"}}>
                                        {comment.parent_text}
                                    </div>
                                </div>
                            }
                            <Field
                                as={"textarea"}
                                name={"text"}
                                style={{width: '450px', maxWidth: '450px'}}
                                className={'margin'}
                                placeholder={'Comment'}
                            />
                            <br/>
                            {
                                (!addComment || comment.level !== 1) &&
                                <Button variant={'outlined'} onClick={handleCancel}>Cancel</Button>
                            }
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
                                {addComment ? 'Add' : 'Save'}
                            </Button>
                        </div>
                    </Form>
                }
            </Formik>
        </Card>
    )
}

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
}

export default AddComment;
