import SearchUsersComponent from "../../../components/layouts/searchUsers/SearchUsersComponent";
import {useQuery} from "react-query";
import {searchUsers} from "../../../api/usersCrud";
import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import authContext from "../../../context/authContext";
import {usersForSearchPropTypes} from "../../../propTypes/userPropTypes";
import {refetchOff} from "../../../config/refetchOff";

const SearchUsersContainer = ({addToFriends, acceptRequest, deleteFromFriends, usersForSearch, setUsersForSearch}) => {

    const {user: {user_id}} = useContext(authContext);
    const [searchText, setSearchText] = useState("");

    const {isFetching} = useQuery(
        ["users", searchText],
        () => searchUsers(user_id, searchText), {
            onSuccess: (data) => setUsersForSearch(data?.data),
            ...refetchOff
        }
    );

    const handleAddToFriends = (id) => {
        addToFriends(user_id, id);
    };

    const handleSearch = (e) => {
        const text = e.target.value;
        setSearchText(text);
    }

    const cleanSearch = () => {
        setSearchText("");
    }

    return (
        <SearchUsersComponent
            handleSearch={handleSearch}
            cleanSearch={cleanSearch}
            searchText={searchText}
            users={usersForSearch}
            acceptRequest={acceptRequest}
            addToFriends={handleAddToFriends}
            deleteFromFriends={deleteFromFriends}
            isFetching={isFetching}
        />
    );
};

SearchUsersContainer.propTypes = {
    addToFriends: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired,
    deleteFromFriends: PropTypes.func.isRequired,
    usersForSearch: usersForSearchPropTypes,
    setUsersForSearch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

export default SearchUsersContainer;
