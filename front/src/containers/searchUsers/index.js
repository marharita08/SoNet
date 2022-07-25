import SearchUsers from "../../components/searchUsers";
import {useQuery} from "react-query";
import {getForSearch} from "../../api/usersCrud";
import React, {useContext} from "react";
import PropTypes from "prop-types";
import authContext from "../../context/authContext";

const SearchUsersContainer = ({addToFriends, accept, deleteFromFriends, usersForSearch, setUsersForSearch}) => {

    const {user:{user_id}} = useContext(authContext);

    useQuery('users', () => getForSearch(user_id), {
        onSuccess: (data) => setUsersForSearch(data?.data)
    });


    const handleAddToFriends = (id) => {
        addToFriends(user_id, id);
    }

    return (
        <SearchUsers
            users={usersForSearch}
            accept={accept}
            addToFriends={handleAddToFriends}
            deleteFromFriends={deleteFromFriends}
        />
    );
}

SearchUsersContainer.propTypes = {
    addToFriends: PropTypes.func.isRequired,
    accept: PropTypes.func.isRequired,
    deleteFromFriends: PropTypes.func.isRequired,
    usersForSearch: PropTypes.arrayOf(
        PropTypes.shape({
            request_id: PropTypes.number,
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string,
            avatar: PropTypes.string,
            is_not_friends: PropTypes.bool,
            is_friends: PropTypes.bool,
            is_incoming_request: PropTypes.bool,
            is_outgoing_request: PropTypes.bool
        })
    ),
    setUsersForSearch: PropTypes.func.isRequired
}

export default SearchUsersContainer;
