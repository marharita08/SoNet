import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {fieldToTextField} from "formik-mui";

const FormikAutocomplete = (props) => {
    const {form: {setTouched, setFieldValue}/*, onChange*/} = props;
    const {error, helperText, ...field} = fieldToTextField(props);
    const {name, label, onChange} = field;

    return (
        <Autocomplete
            {...props}
            {...field}
            options={props.options || []}
            getOptionLabel={option => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(_, value) => {
                setFieldValue(name, value);
                if (onChange) {
                    onChange(value.value);
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
