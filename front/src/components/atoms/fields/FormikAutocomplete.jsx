import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {fieldToTextField} from "formik-mui";

const FormikAutocomplete = (props) => {
  const {form: {setTouched, setFieldValue}} = props;
  const {error, helperText, ...field} = fieldToTextField(props);
  const {name, label, setValue} = field;

  return (
    <Autocomplete
      {...props}
      {...field}
      options={props.options || []}
      getOptionLabel={option => option.label || ""}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(_, value) => {
        setFieldValue(name, value);
        if (setValue) {
          setValue(value?.value || "");
        }
      }}
      onBlur={() => setTouched({[name]: true})}
      renderInput={props =>
        <TextField {...props} variant={"outlined"} helperText={helperText} error={error} label={label}/>
      }
    />
  );
};

export default FormikAutocomplete;
