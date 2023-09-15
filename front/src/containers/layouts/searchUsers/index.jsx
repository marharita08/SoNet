import SearchUsers from "../../../components/layouts/searchUsers";
import {useQuery} from "react-query";
import {getForSearch} from "../../../api/usersCrud";
import React, {useContext} from "react";
import PropTypes from "prop-types";
import authContext from "../../../context/authContext";
import {usersForSearchPropTypes} from "../../../propTypes/userPropTypes";

const SearchUsersContainer = ({addToFriends, accept, deleteFromFriends, usersForSearch, setUsersForSearch}) => {

    const {user: {user_id}} = useContext(authContext);

    const {isFetching} = useQuery("users", () => getForSearch(user_id), {
        onSuccess: (data) => setUsersForSearch(data?.data),
        refetchInterval: false,
        refetchOnWindowFocus: false
    });

    const handleAddToFriends = (id) => {
        addToFriends(user_id, id);
    };

    return (
        <SearchUsers
            users={usersForSearch}
            accept={accept}
            addToFriends={handleAddToFriends}
            deleteFromFriends={deleteFromFriends}
            isFetching={isFetching}
        />
    );
};

SearchUsersContainer.propTypes = {
    addToFriends: PropTypes.func.isRequired,
    accept: PropTypes.func.isRequired,
    deleteFromFriends: PropTypes.func.isRequired,
    usersForSearch: usersForSearchPropTypes,
    setUsersForSearch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

export default SearchUsersContainer;
