import React from "react";
import CancelButton from "../../atoms/buttons/CancelButton";
import SubmitButton from "../../atoms/buttons/SubmitButton";
import {DialogActions} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";

const SaveCancelDialogActions = ({cancelOnClick, isLoading, isAdd}) => {

  const theme = useTheme();

  return (
    <DialogActions sx={theme.dialogActions}>
      <CancelButton onClick={cancelOnClick}/>
      <SubmitButton isLoading={isLoading} isAdd={isAdd}/>
    </DialogActions>
  );
};

SaveCancelDialogActions.propTypes = {
  cancelOnClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isAdd: PropTypes.bool
};

SaveCancelDialogActions.defaultProps = {
  isLoading: false,
  isAdd: false
};

export default SaveCancelDialogActions;
