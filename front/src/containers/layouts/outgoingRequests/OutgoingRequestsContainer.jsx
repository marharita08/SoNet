import React from "react";
import PropTypes from "prop-types";

import {getOutgoingRequests} from "../../../api/usersCrud";
import {requestsPropTypes} from "../../../propTypes/requestPropTypes";
import UserCards from "../../../components/layouts/userCards/UserCards";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";

const OutgoingRequestsContainer = ({id,  outgoingRequests, actions}) => {

  const {setOutgoingRequests, ...cardActions} = actions;
  const {isFetching} = useQueryWrapper(
    "outgoing-requests",
    () => getOutgoingRequests(id),
    {
      onSuccess: (data) => setOutgoingRequests(data?.data)
    }
  );

  return (
    <UserCards
      heading={"Outgoing Requests"}
      users={outgoingRequests}
      isFetching={isFetching}
      {...cardActions}
    />
  );
};

OutgoingRequestsContainer.propTypes = {
  id: PropTypes.number.isRequired,
  outgoingRequests: requestsPropTypes,
  actions: PropTypes.shape({
    deleteRequest: PropTypes.func.isRequired,
    setOutgoingRequests: PropTypes.func.isRequired,
  })
};

export default OutgoingRequestsContainer;
