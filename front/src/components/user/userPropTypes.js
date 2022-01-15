import PropTypes from "prop-types";

let filePropTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}

let addressPropTypes = {
    line1: PropTypes.string.isRequired,
    line2: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zip: PropTypes.number.isRequired
}

let friendPropTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
        file: PropTypes.shape(filePropTypes)
    }),
    files: PropTypes.arrayOf(PropTypes.shape(filePropTypes)),
    addr: PropTypes.shape({
        main: PropTypes.shape(addressPropTypes),
        alt: PropTypes.shape(addressPropTypes)
    })
}

export let userPropTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        age: PropTypes.string.isRequired,
        avatar: PropTypes.shape({
            file: PropTypes.shape(filePropTypes)
        }),
        files: PropTypes.arrayOf(PropTypes.shape(filePropTypes)),
        addr: PropTypes.shape({
            main: PropTypes.shape(addressPropTypes),
            alt: PropTypes.shape(addressPropTypes)
        }),
        friends: PropTypes.arrayOf(PropTypes.shape(friendPropTypes))
    })
}