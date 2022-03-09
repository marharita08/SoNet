import React from "react";
import {useQuery} from "react-query";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";

import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/user";
import {getIncomingRequests} from "../../api/usersCrud";

const IncomingRequests = ({id, acceptMutate, declineMutate}) => {

    const {isFetching: incomingRequestsFetching, data: incomingRequestsData} =
        useQuery('incoming-requests', () => getIncomingRequests(id));
    let incomingRequests = incomingRequestsData?.data;

    const decline = (user_id) => {
        declineMutate({
            to_user_id: id,
            from_user_id: user_id
        });
    }

    const accept = (user_id) => {
        acceptMutate({
            to_user_id: id,
            from_user_id: user_id
        });
    }

    return (
        <>
            <h2>Incoming Requests</h2>
            {incomingRequestsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <div>
                {incomingRequests?.map((user)=>
                    <ErrorBoundary key={user.user_id}>
                        <User user={user} menu={true} accept={accept} decline={decline}/>
                    </ErrorBoundary>
                )}
            </div>
        </>
    );
}

IncomingRequests.propTypes = {
    id: PropTypes.number.isRequired,
    acceptMutate: PropTypes.func.isRequired,
    declineMutate: PropTypes.func.isRequired
};

export default IncomingRequests;


