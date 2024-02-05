import React from "react";
import TextField from "@material-ui/core/TextField";
import {fieldToTextField} from "formik-mui";

const FormikDatePicker = (props) => {
  const {form: {setFieldValue}} = props;
  const field = fieldToTextField(props);
  const {name} = field;

  return (
    <TextField
      {...props}
      {...field}
      type={"date"}
      onChange={(event) => setFieldValue(name, event.target.value)}
      variant={"outlined"}
    />
  )
}

export default FormikDatePicker;
