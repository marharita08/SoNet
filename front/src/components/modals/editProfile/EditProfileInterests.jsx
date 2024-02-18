import React from "react";
import {Checkbox, FormControlLabel, FormLabel} from "@mui/material";
import {Field, useFormikContext} from "formik";
import PropTypes from "prop-types";

const EditProfileInterests = ({interests, setFieldValue, onChange}) => {

  const {values} = useFormikContext();

  return (
    <>
      <FormLabel component="legend">Interests</FormLabel>
      {
        interests?.map(interest => (
          <Field
            type={"checkbox"}
            name={"interests"}
            value={interest.interest_id}
            key={interest.interest_id}
            as={FormControlLabel}
            control={<Checkbox/>}
            checked={values.interests.includes(interest.interest_id)}
            label={interest.interest}
            onChange={(e) => onChange(e, values.interests, setFieldValue)}
          />
        ))
      }
    </>
  )
}

EditProfileInterests.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired
}

export default EditProfileInterests;
