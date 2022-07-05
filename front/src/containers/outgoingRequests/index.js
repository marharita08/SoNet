import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import {useQuery} from "react-query";

import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/user";
import {getOutgoingRequests} from "../../api/usersCrud";

const OutgoingRequests = ({id, deleteMutate}) => {

    const {isFetching: outgoingRequestsFetching, data: outgoingRequestsData} = useQuery('outgoing-requests', () => getOutgoingRequests(id));
    let outgoingRequests = outgoingRequestsData?.data;

    const handleClose = (user_id) => {
        deleteMutate({
            current_user_id: id,
            user_id: user_id
        });
    };

    return (
        <>
            {
                (outgoingRequestsFetching || outgoingRequests.length !== 0) &&
                <h2>Outgoing Requests</h2>
            }
            {outgoingRequestsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <div>
                {outgoingRequests?.map((user)=>
                    <ErrorBoundary key={user.user_id}>
                        <User user={user} handleClose={handleClose} menu={false}/>
                    </ErrorBoundary>
                )}
            </div>
        </>
    );
}

OutgoingRequests.propTypes = {
    id: PropTypes.number.isRequired,
    deleteMutate: PropTypes.func.isRequired
};

export default OutgoingRequests;


