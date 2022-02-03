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
    MenuItem
} from "@mui/material";

import './addArticle.css';
import {Select} from "formik-mui";
import {useBetween} from "use-between";
import {modalState} from "../../containers/header";
import {useState} from "react";
import * as Yup from "yup";
import {insertArticle, updateArticle} from "../../containers/api/articlesCrud";
import {useMutation} from "react-query";

const initArticle = {
    text: "",
    visibility_id: 1,
    user_id: 1,
};

export const articleState = () => {
    const [article, setArticle] = useState(initArticle);
    const [addArticle, setAddArticle] = useState(true);
    return {
        article, setArticle,
        addArticle, setAddArticle
    }
}

const AddArticle = ({visibilities}) => {
    const {article, setArticle, addArticle, setAddArticle} = useBetween(articleState);
    const {open, setOpen} = useBetween(modalState);

    let title;
    if (addArticle) {
        title = "Add article";
    } else {
        title = "Edit article";
    }

    const schema = Yup.object().shape({
        text: Yup.string().required("Text is required"),
        visibility_id: Yup.number().min(1).max(visibilities?.length),
    })

    const { mutate: updateMutate, isLoading: updateLoading } = useMutation(
        updateArticle, {
        onSuccess: data => {
            console.log(data);
            alert(data.data)
        },
        onError: () => {
            alert("Updating was failed.");
        }
    });

    const { mutate: insertMutate, isLoading: insertLoading } = useMutation(
        insertArticle, {
            onSuccess: data => {
                console.log(data);
                alert(data.data)
            },
            onError: () => {
                alert("Adding was failed.");
            }
        });

    const onFormSubmit = (data) => {
        if (addArticle) {
            insertMutate(data);
        } else {
            updateMutate(data);
        }
        setOpen(false);
        setArticle(initArticle);
        setAddArticle(true);
    }

    const handleClose = () => {
        setOpen(false);
        setArticle(initArticle);
        setAddArticle(true);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Formik
                    initialValues={article}
                    onSubmit={onFormSubmit}
                    validationSchema={schema}
                >
                    <Form>
                        <IconButton className="closebtn margin" onClick={handleClose}>
                            <span>&times;</span>
                        </IconButton>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogContent>
                            <ErrorMessage name="text" render={msg => <div className="error">{msg}</div>}/>
                            <Field as={"textarea"} name={"text"} />
                            <div align={"center"}>
                                <div className={"available"}>
                                    <div className={"margin"} align={"left"}>
                                        <Field
                                            component={Select}
                                            className={"visibility"}
                                            name={"visibility_id"}
                                            label={"Available to"}
                                        >
                                            {visibilities?.map((visibility, i) =>
                                                <MenuItem key={i} value={visibility.visibility_id}>
                                                    {visibility.visibility}
                                                </MenuItem>
                                            )}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{margin:"5px"}} variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                sx={{margin:"5px"}}
                                type={"submit"}
                                variant="contained"
                                disabled={insertLoading||updateLoading}
                                startIcon={
                                    insertLoading||updateLoading ? (
                                        <CircularProgress color="inherit" size={25} />
                                    ) : null
                                }
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
        </>
    );
}

AddArticle.propTypes = {
    visibilities: PropTypes.arrayOf(PropTypes.shape({
        visibility_id: PropTypes.number.isRequired,
        visibility: PropTypes.string.isRequired
    }))
}

export default AddArticle;
