import PropTypes from 'prop-types';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem} from "@mui/material";

import './addArticle.css';
import {Select} from "formik-mui";
import {useBetween} from "use-between";
import {modalState} from "../../containers/header";
import {useState} from "react";
import * as Yup from "yup";
import {insertArticle, updateArticle} from "../../containers/api/articlesCrud";

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

    const schema = Yup.object().shape({
        text: Yup.string().required("Text is required"),
    })

    const onFormSubmit = (data) => {
        console.log(data);
        if (addArticle) {
            insertArticle(article)
                .then(r => console.log(r))
                .catch((err) => {console.log(err);});
        } else {
            updateArticle(article)
                .then(r => console.log(r))
                .catch((err) => {console.log(err);});
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
                        {addArticle && <DialogTitle>Add article</DialogTitle>}
                        {!addArticle && <DialogTitle>Edit article</DialogTitle>}
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
                            <Button sx={{margin:"5px"}} type={"submit"} variant="contained">
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
