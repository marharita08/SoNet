import PropTypes from "prop-types";

export let ProfilePropTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.shape ({
            value: PropTypes.string.isRequired,
            availableTo: PropTypes.number.isRequired,
        }),
        email: PropTypes.shape ({
            value: PropTypes.string.isRequired,
            availableTo: PropTypes.number.isRequired,
        }),
        phone: PropTypes.shape ({
            value: PropTypes.string.isRequired,
            availableTo: PropTypes.number.isRequired,
        }),
        university: PropTypes.shape ({
            id: PropTypes.number.isRequired,
            availableTo: PropTypes.number.isRequired,
        }),
        avatar: PropTypes.string.isRequired
    }),
    universities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    visibilities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }))
}