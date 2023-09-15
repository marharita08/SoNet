import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "react-query";
import {getOutgoingRequests} from "../../../api/usersCrud";
import {requestsPropTypes} from "../../../propTypes/requestPropTypes";
import UserCards from "../../../components/layouts/userCards/UserCards";

const OutgoingRequests = ({id, deleteRequest, outgoingRequests, setOutgoingRequests}) => {

    const {isFetching} = useQuery(
        "outgoing-requests",
        () => getOutgoingRequests(id),
        {
            onSuccess: (data) => setOutgoingRequests(data?.data),
            refetchInterval: false,
            refetchOnWindowFocus: false
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

OutgoingRequests.propTypes = {
    id: PropTypes.number.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    outgoingRequests: requestsPropTypes,
    setOutgoingRequests: PropTypes.func.isRequired,
};

export default OutgoingRequests;
