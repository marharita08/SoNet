import React from "react";
import {DialogActions} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";

import CancelButton from "../../atoms/buttons/CancelButton";
import SubmitButton from "../../atoms/buttons/SubmitButton";


const SaveCancelDialogActions = ({cancelOnClick, flags}) => {

  const theme = useTheme();

  return (
    <DialogActions sx={theme.dialogActions}>
      <CancelButton onClick={cancelOnClick}/>
      <SubmitButton {...flags}/>
    </DialogActions>
  );
};

SaveCancelDialogActions.propTypes = {
  cancelOnClick: PropTypes.func.isRequired,
  flags: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    isAdd: PropTypes.bool.isRequired
  }).isRequired
};

export default SaveCancelDialogActions;
