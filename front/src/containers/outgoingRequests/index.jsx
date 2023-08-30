import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "react-query";

import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/user";
import {getOutgoingRequests} from "../../api/usersCrud";
import Loading from "../../components/loading";

const OutgoingRequests = ({id, deleteRequest, outgoingRequests, setOutgoingRequests}) => {

    const { isFetching: outgoingRequestsFetching } =
        useQuery('outgoing-requests', () => getOutgoingRequests(id), {
            onSuccess: (data) => setOutgoingRequests(data?.data),
            refetchInterval: false,
            refetchOnWindowFocus: false
        });

    return (
        <div className={"margin"}>
            {
                (outgoingRequestsFetching || outgoingRequests?.length !== 0) &&
                <h2>Outgoing Requests</h2>
            }
            <Loading isLoading={outgoingRequestsFetching} align={'left'}/>
            {outgoingRequests?.map((user) =>
                <ErrorBoundary key={user.user_id}>
                    <User user={user} deleteRequest={deleteRequest} menu={false}/>
                </ErrorBoundary>
            )}
        </div>
    );
}

OutgoingRequests.propTypes = {
    id: PropTypes.number.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    outgoingRequests: PropTypes.arrayOf(
        PropTypes.shape({
            request_id: PropTypes.number.isRequired,
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),
    setOutgoingRequests: PropTypes.func.isRequired,
};

export default OutgoingRequests;
