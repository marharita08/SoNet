import React from "react";
import {useQuery} from "react-query";
import PropTypes from "prop-types";
import {getIncomingRequests} from "../../../api/usersCrud";
import UserCards from "../../../components/layouts/userCards/UserCards";
import {requestsPropTypes} from "../../../propTypes/requestPropTypes";
import {refetchOff} from "../../../config/refetchOff";

const IncomingRequestsContainer = ({id, acceptRequest, declineRequest, incomingRequests, setIncomingRequests}) => {

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
            acceptRequest={acceptRequest}
            declineRequest={declineRequest}
            users={incomingRequests}
            isMenu={true}
            isFetching={isFetching}
        />
    );
};

IncomingRequestsContainer.propTypes = {
    id: PropTypes.number.isRequired,
    acceptRequest: PropTypes.func.isRequired,
    declineRequest: PropTypes.func.isRequired,
    incomingRequests: requestsPropTypes,
    setIncomingRequests: PropTypes.func.isRequired,
};

export default IncomingRequestsContainer;
