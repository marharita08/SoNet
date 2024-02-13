import React from "react";
import {Avatar, Divider} from "@mui/material";
import * as Yup from "yup";
import {Formik, Form, Field} from "formik";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";

import SNTextarea from "../../atoms/fields/SNTextarea";
import SubmitButton from "../../atoms/buttons/SubmitButton";
import CancelButton from "../../atoms/buttons/CancelButton";
import {useStyles} from "../../style";
import {commentAddPropTypes} from "../../../propTypes/commentPropTypes";

const AddOrEditCommentComponent = ({user, comment, flags, actions}) => {

  const {isLoading, isCommentAdd} = flags;
  const {onSubmit,  handleCancel} = actions;
  const theme = useTheme();
  const classes = useStyles();

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
          <Form onSubmit={handleSubmit} className={classes.flex}>
            <Avatar
              src={user.avatar}
              className={classes.addCommentAvatar}
              sx={theme.avatarSizes.lg}
            />
            <div className={classes.commentFieldContainer}>
              {
                comment.to &&
                <div className={classes.margin}>
                  Reply to: {comment.to}
                  <div className={classes.replyToText}>
                    {comment.parent_text}
                  </div>
                </div>
              }
              <div className={classes.margin}>
                <Field
                  label={"Comment"}
                  type={"text"}
                  name={"text"}
                  component={SNTextarea}
                />
              </div>
              {
                (!isCommentAdd || comment.level !== 1) &&
                <span className={classes.margin}>
                  <CancelButton onClick={handleCancel}/>
                </span>
              }
              <span className={classes.margin}>
                <SubmitButton isLoading={isLoading} isAdd={isCommentAdd}/>
              </span>
            </div>
          </Form>
        }
      </Formik>
    </>
  );
};

AddOrEditCommentComponent.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string
  }).isRequired,
  comment: commentAddPropTypes.isRequired,
  actions: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
  }),
  flags: PropTypes.shape({
    isLoading: PropTypes.bool,
    isCommentAdd: PropTypes.bool.isRequired,
  })
};

AddOrEditCommentComponent.defaultProps = {
  flags: {
    isLoading: false
  }
};

export default AddOrEditCommentComponent;
