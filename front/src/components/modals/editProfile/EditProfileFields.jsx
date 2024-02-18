import React from "react";
import PropTypes from "prop-types";

import EditProfileFieldRow from "./EditProfileFieldRow";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
import FormikDatePicker from "../../atoms/fields/FormikDatePicker";
import {useStyles} from "./style";
import {optionsPropTypes} from "../../../propTypes/optionsPropTypes";

const EditProfileFields = ({visibilities, universities, locations, actions}) => {

  const {countries, states, cities} = locations;
  const {onCountryChange,  onStateChange} = actions;
  const classes = useStyles();

  return (
    <div className={classes.fieldsContainer}>
      <EditProfileFieldRow
        fieldName={"name"}
        fieldLabel={"Name"}
      />
      <EditProfileFieldRow
        fieldName={"email"}
        fieldLabel={"Email"}
        fieldType={"email"}
        visibilityName={"email_visibility"}
        visibilities={visibilities}
      />
      <EditProfileFieldRow
        fieldName={"birthday"}
        fieldLabel={"Birthday"}
        fieldComponent={FormikDatePicker}
        visibilityName={"birthday_visibility"}
        visibilities={visibilities}
      />
      <EditProfileFieldRow
        fieldName={"phone"}
        fieldLabel={"Phone"}
        visibilityName={"phone_visibility"}
        visibilities={visibilities}
      />
      <EditProfileFieldRow
        fieldName={"country"}
        fieldLabel={"Country"}
        fieldComponent={FormikAutocomplete}
        fieldOptions={countries}
        visibilityName={"country_visibility"}
        visibilities={visibilities}
        setValue={onCountryChange}
      />
      <EditProfileFieldRow
        fieldName={"state"}
        fieldLabel={"State"}
        fieldComponent={FormikAutocomplete}
        fieldOptions={states}
        visibilityName={"state_visibility"}
        visibilities={visibilities}
        setValue={onStateChange}
      />
      <EditProfileFieldRow
        fieldName={"city"}
        fieldLabel={"City"}
        fieldComponent={FormikAutocomplete}
        fieldOptions={cities}
        visibilityName={"city_visibility"}
        visibilities={visibilities}
      />
      <EditProfileFieldRow
        fieldName={"university"}
        fieldLabel={"University"}
        fieldComponent={FormikAutocomplete}
        fieldOptions={universities}
        visibilityName={"university_visibility"}
        visibilities={visibilities}
      />
    </div>
  );
};

EditProfileFields.propTypes = {
  visibilities: optionsPropTypes,
  universities: optionsPropTypes,
  locations: PropTypes.shape({
    countries: optionsPropTypes,
    states: optionsPropTypes,
    cities: optionsPropTypes,
  }),
  actions: PropTypes.shape({
    onCountryChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired
  })
};

export default EditProfileFields;
