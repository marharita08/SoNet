const parseToOption = (value, label) => ({value, label});

const setNullIfNoValue = (result, field) => {
    if (!result[field].value) {
        result[field] = null;
    }
}

const parseToProfile = (userData) => {
    if (userData) {
        const {
            email_visibility_id, ev_label,
            phone_visibility_id, pv_label,
            university_id, university_label,
            university_visibility_id, uv_label,
            country_visibility_id, cv_label,
            state_visibility_id, sv_label,
            city_visibility_id, civ_label,
            country_id, country_name,
            state_id, state_name,
            city_id, city_name,
            ...rest
        } = userData;
        const result = {
            ...rest,
            email_visibility: parseToOption(email_visibility_id, ev_label),
            phone_visibility: parseToOption(phone_visibility_id, pv_label),
            university: parseToOption(university_id, university_label),
            university_visibility: parseToOption(university_visibility_id, uv_label),
            country_visibility: parseToOption(country_visibility_id, cv_label),
            state_visibility: parseToOption(state_visibility_id, sv_label),
            city_visibility: parseToOption(city_visibility_id, civ_label),
            country: parseToOption(country_id, country_name),
            state: parseToOption(state_id, state_name),
            city: parseToOption(city_id, city_name)
        };
        setNullIfNoValue(result, "university");
        setNullIfNoValue(result, "country");
        setNullIfNoValue(result, "state");
        setNullIfNoValue(result, "city");
        if (result.university.value == null) {
            result.university = null;
        }

        return result;
    }
    return undefined;
};

const parseLocations = (location, name) => {
    return {
        [`${name}_id`]: location ? location.value : null,
        [`${name}_name`]: location ? location.label : null
    };
};

const parseToUserAndSettings = (userData) => {
    const {
        email_visibility: {value: email_visibility_id},
        phone_visibility: {value: phone_visibility_id},
        university_visibility: {value: university_visibility_id},
        country_visibility: {value: country_visibility_id},
        state_visibility: {value: state_visibility_id},
        city_visibility: {value: city_visibility_id},
        university: {value: university_id},
        country,
        state,
        city,
        ...rest
    } = userData;

    const user = {
        ...rest,
        university_id,
        ...parseLocations(country, "country"),
        ...parseLocations(state, "state"),
        ...parseLocations(city, "city")
    };
    const settings = {
        email_visibility_id,
        phone_visibility_id,
        university_visibility_id,
        country_visibility_id,
        state_visibility_id,
        city_visibility_id
    };
    if (user.phone === "") {
        user.phone = null;
    }
    if (user.fb_id === "") {
        user.fb_id = null;
    }
    return {user, settings};
};

module.exports = {parseToProfile, parseToUserAndSettings}
