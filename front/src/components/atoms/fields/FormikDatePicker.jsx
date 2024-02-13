import React from "react";
import {fieldToTextField} from "formik-mui";
import {DatePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {de} from "date-fns/locale/de";

const FormikDatePicker = (props) => {
  const {form: {setFieldValue}} = props;
  const field = fieldToTextField(props);
  const {name} = field;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <DatePicker
        disableFuture
        {...props}
        {...field}
        onChange={(newValue) => setFieldValue(name, newValue)}
        slots={{
          textField: params => <TextField {...params} fullWidth variant={"outlined"}/>
        }}
     />
    </LocalizationProvider>
  );
};

export default FormikDatePicker;
