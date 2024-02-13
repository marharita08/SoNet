import React from "react";
import PropTypes from "prop-types";

import SearchUsersOptionUser from "./SearchUsersOptionUser";
import SearchUsersOptionIconBtn from "./SearchUsersOptionIconBtn";
import {userForSearchPropTypes} from "../../../propTypes/userPropTypes";
import {useStyles} from "./style";

const SearchUsersOption = ({user, actions}) => {

  const classes = useStyles();

  return (
    <div className={classes.option}>
      <SearchUsersOptionUser
        user={user}
      />
      <SearchUsersOptionIconBtn
        user={user}
        actions={actions}
      />
    </div>
  );
};

SearchUsersOption.propTypes = {
  user: userForSearchPropTypes,
  actions: PropTypes.shape({
    deleteFromFriends: PropTypes.func.isRequired,
    addToFriends: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired
  })
};

export default SearchUsersOption;
