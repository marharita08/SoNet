import React from "react";
import {Field} from "formik";
import {TextField} from "formik-mui";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
import {useStyles} from "./style";
import PropTypes from "prop-types";
import {optionsPropTypes} from "../../../propTypes/optionsPropTypes";

const EditProfileFieldRow = ({
  fieldType,
  fieldName,
  fieldLabel,
  fieldComponent,
  fieldOptions,
  visibilityName,
  visibilities,
  setValue
}) => {

  const classes = useStyles();

  return (
    <div>
      <div className={classes.field}>
        <Field
          component={fieldComponent}
          type={fieldType}
          name={fieldName}
          label={fieldLabel}
          options={fieldOptions}
          setValue={setValue}
          fullWidth
        />
      </div>
      <div className={classes.visibility}>
        {
          visibilities &&
          <Field
            component={FormikAutocomplete}
            name={visibilityName}
            label={"Available to"}
            options={visibilities}
          />
        }
      </div>
    </div>
  );
};

EditProfileFieldRow.propTypes = {
  fieldType: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string.isRequired,
  fieldComponent: PropTypes.elementType,
  fieldOptions: PropTypes.array,
  visibilityName: PropTypes.string,
  visibilities: optionsPropTypes
};

EditProfileFieldRow.defaultProps = {
  fieldType: "text",
  visibilityName: undefined,
  visibilities: undefined,
  fieldComponent: TextField,
  fieldOptions: undefined
};

export default EditProfileFieldRow;
