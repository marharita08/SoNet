import React from "react";
import {useQuery} from "react-query";
import PropTypes from "prop-types";
import {getIncomingRequests} from "../../api/usersCrud";
import UserCards from "../../components/layouts/userCards/UserCards";
import {requestsPropTypes} from "../../propTypes/requestPropTypes";

const IncomingRequests = ({id, accept, decline, incomingRequests, setIncomingRequests}) => {

    const {isFetching} = useQuery(
        "incoming-requests",
        () => getIncomingRequests(id),
        {
            onSuccess: (data) => setIncomingRequests(data?.data),
            refetchInterval: false,
            refetchOnWindowFocus: false
        }
    );

    return (
        <UserCards
            heading={"Incoming Requests"}
            accept={accept}
            decline={decline}
            users={incomingRequests}
            isMenu={true}
            isFetching={isFetching}
        />
    );
};

IncomingRequests.propTypes = {
    id: PropTypes.number.isRequired,
    accept: PropTypes.func.isRequired,
    decline: PropTypes.func.isRequired,
    incomingRequests: requestsPropTypes,
    setIncomingRequests: PropTypes.func.isRequired,
};

export default IncomingRequests;
