import React from "react";
import EditProfileFieldRow from "./EditProfileFieldRow";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
import {useStyles} from "./style";
import {visibilitiesPropTypes} from "../../../propTypes/visibilitiesPropTypes";
import {universitiesPropTypes} from "../../../propTypes/universitiesPropTypes";

const EditProfileFields = ({visibilities, universities, countries, states, onCountryChange}) => {

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
                fieldName={"phone"}
                fieldLabel={"Phone"}
                visibilityName={"phone_visibility"}
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
            <EditProfileFieldRow
                fieldName={"country"}
                fieldLabel={"Country"}
                fieldComponent={FormikAutocomplete}
                fieldOptions={countries}
                visibilityName={"country_visibility"}
                visibilities={visibilities}
                onChange={onCountryChange}
            />
            <EditProfileFieldRow
                fieldName={"state"}
                fieldLabel={"State"}
                fieldComponent={FormikAutocomplete}
                fieldOptions={states}
                visibilityName={"state_visibility"}
                visibilities={visibilities}
            />
        </div>
    );
};

EditProfileFields.propTypes = {
    visibilities: visibilitiesPropTypes,
    universities: universitiesPropTypes
};

export default EditProfileFields;
