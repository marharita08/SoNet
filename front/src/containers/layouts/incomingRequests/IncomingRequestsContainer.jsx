import React from "react";
import {useQuery} from "react-query";
import PropTypes from "prop-types";

import {getIncomingRequests} from "../../../api/usersCrud";
import UserCards from "../../../components/layouts/userCards/UserCards";
import {requestsPropTypes} from "../../../propTypes/requestPropTypes";
import {refetchOff} from "../../../config/refetchOff";

const IncomingRequestsContainer = ({id,  incomingRequests, actions}) => {

  const {setIncomingRequests, ...cardActions} = actions
  const {isFetching} = useQuery(
    "incoming-requests",
    () => getIncomingRequests(id),
    {
      onSuccess: (data) => setIncomingRequests(data?.data),
      ...refetchOff
    }
  );

  return (
    <UserCards
      heading={"Incoming Requests"}
      users={incomingRequests}
      isMenu={true}
      isFetching={isFetching}
      {...cardActions}
    />
  );
};

IncomingRequestsContainer.propTypes = {
  id: PropTypes.number.isRequired,
  incomingRequests: requestsPropTypes,
  actions: PropTypes.shape({
    acceptRequest: PropTypes.func.isRequired,
    declineRequest: PropTypes.func.isRequired,
    setIncomingRequests: PropTypes.func.isRequired,
  }).isRequired
};

export default IncomingRequestsContainer;
