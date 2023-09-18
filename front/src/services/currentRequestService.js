const addRequest = (request) => {
    return {...request, is_outgoing_request: true};
}

const acceptRequest = (request) => {
    let updatedRequest = request;
    updatedRequest.is_friends = true;
    updatedRequest.is_incoming_request = false;
    return updatedRequest;
}

const deleteRequest = () => {
    return {is_not_friends: true}
}

export default {
    addRequest,
    acceptRequest,
    deleteRequest
}
