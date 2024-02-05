import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "react-query";
import {getOutgoingRequests} from "../../../api/usersCrud";
import {requestsPropTypes} from "../../../propTypes/requestPropTypes";
import UserCards from "../../../components/layouts/userCards/UserCards";
import {refetchOff} from "../../../config/refetchOff";

const OutgoingRequestsContainer = ({id, deleteRequest, outgoingRequests, setOutgoingRequests}) => {

  const {isFetching} = useQuery(
    "outgoing-requests",
    () => getOutgoingRequests(id),
    {
      onSuccess: (data) => setOutgoingRequests(data?.data),
      ...refetchOff
    }
  );

  return (
    <UserCards
      heading={"Outgoing Requests"}
      users={outgoingRequests}
      deleteRequest={deleteRequest}
      isFetching={isFetching}
    />
  );
};

OutgoingRequestsContainer.propTypes = {
  id: PropTypes.number.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  outgoingRequests: requestsPropTypes,
  setOutgoingRequests: PropTypes.func.isRequired,
};

export default OutgoingRequestsContainer;
