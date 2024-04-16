import React, {useContext, useState} from "react";
import SearchUsersComponent from "../../../components/layouts/searchUsers/SearchUsersComponent";
import PropTypes from "prop-types";

import {searchUsers} from "../../../api/usersCrud";
import authContext from "../../../context/authContext";
import {usersForSearchPropTypes} from "../../../propTypes/userPropTypes";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";

const SearchUsersContainer = ({usersForSearch, actions}) => {

  const {addToFriends, acceptRequest, deleteFromFriends, setUsersForSearch} = actions
  const {user: {user_id}} = useContext(authContext);
  const [searchText, setSearchText] = useState("");

  const {isFetching} = useQueryWrapper(
    ["users", searchText],
    () => searchUsers(user_id, searchText), {
      onSuccess: (data) => setUsersForSearch(data?.data)
    }
  );

  const handleAddToFriends = (id) => {
    addToFriends(user_id, id);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const cleanSearch = () => {
    setSearchText("");
  };

  return (
    <SearchUsersComponent
      actions={{handleSearch, cleanSearch, acceptRequest, addToFriends: handleAddToFriends, deleteFromFriends}}
      searchText={searchText}
      users={usersForSearch}
      isFetching={isFetching}
    />
  );
};

SearchUsersContainer.propTypes = {
  actions: PropTypes.shape({
    addToFriends: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired,
    deleteFromFriends: PropTypes.func.isRequired,
    setUsersForSearch: PropTypes.func.isRequired,
  }).isRequired,
  usersForSearch: usersForSearchPropTypes,
};

export default SearchUsersContainer;
