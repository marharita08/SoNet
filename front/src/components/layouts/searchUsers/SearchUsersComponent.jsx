import React from "react";
import {Card} from "@mui/material";
import PropTypes from "prop-types";
import {usersForSearchPropTypes} from "../../../propTypes/userPropTypes";
import SearchField from "./SearchField";
import SearchUsersOption from "./SearchUsersOption";
import {useStyles} from "./style";

const SearchUsersComponent = ({
    handleSearch,
    cleanSearch,
    searchText,
    users,
    addToFriends,
    acceptRequest,
    deleteFromFriends,
    isFetching
}) => {

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
                        addToFriends={addToFriends}
                        deleteFromFriends={deleteFromFriends}
                        acceptRequest={acceptRequest}
                    />
                ))}
            </Card>
        </>
    );
};

SearchUsersComponent.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    cleanSearch: PropTypes.func.isRequired,
    searchText: PropTypes.string,
    addToFriends: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired,
    deleteFromFriends: PropTypes.func.isRequired,
    users: usersForSearchPropTypes,
    isFetching: PropTypes.bool
};

export default SearchUsersComponent;
