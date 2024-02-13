import React from "react";
import {Card} from "@mui/material";
import PropTypes from "prop-types";

import {usersForSearchPropTypes} from "../../../propTypes/userPropTypes";
import SearchField from "./SearchField";
import SearchUsersOption from "./SearchUsersOption";
import {useStyles} from "./style";

const SearchUsersComponent = ({searchText, users, isFetching, actions}) => {

  const {handleSearch, cleanSearch, ...optionActions} = actions;
  const classes = useStyles();

  return (
    <>
      <SearchField
        isFetching={isFetching}
        onChange={handleSearch}
        value={searchText}
        className={classes.search}
        cleanSearch={cleanSearch}
      />
      <Card className={classes.searchCard}>
        {users?.map((user) => (
          <SearchUsersOption
            key={user.user_id}
            user={user}
            actions={optionActions}
          />
        ))}
      </Card>
    </>
  );
};

SearchUsersComponent.propTypes = {
  searchText: PropTypes.string,
  users: usersForSearchPropTypes,
  isFetching: PropTypes.bool,
  actions: PropTypes.shape({
    handleSearch: PropTypes.func.isRequired,
    cleanSearch: PropTypes.func.isRequired,
    addToFriends: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired,
    deleteFromFriends: PropTypes.func.isRequired,
  })
};

export default SearchUsersComponent;
