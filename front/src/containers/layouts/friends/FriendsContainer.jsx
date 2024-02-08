import React from "react";
import {useQuery} from "react-query";
import PropTypes from "prop-types";

import {getFriends} from "../../../api/usersCrud";
import {requestsPropTypes} from "../../../propTypes/requestPropTypes";
import UserCards from "../../../components/layouts/userCards/UserCards";
import {refetchOff} from "../../../config/refetchOff";

const FriendsContainer = ({id, friends, actions}) => {

  const {setFriends, ...cardActions} = actions
  const {isFetching} = useQuery(
    "friends",
    () => getFriends(id),
    {
      onSuccess: (data) => setFriends(data?.data),
      ...refetchOff
    }
  );

  return (
    <UserCards
      heading={"Friends"}
      isFetching={isFetching}
      users={friends}
      {...cardActions}
    />
  );
};

FriendsContainer.propTypes = {
  id: PropTypes.number.isRequired,
  friends: requestsPropTypes,
  actions: PropTypes.shape({
    deleteRequest: PropTypes.func.isRequired,
    setFriends: PropTypes.func.isRequired,
  })
};

export default FriendsContainer;
