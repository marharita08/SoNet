const addRequest = (requests, request) => {
    return [...requests, request];
}

const getRequest = (requests, request_id) => {
    const index = requests.findIndex((obj => obj.request_id === request_id));
    return requests[index];
}

const deleteRequest = (requests, request_id) => {
    return requests.filter(obj => (+obj.request_id) !== (+request_id));
}

export default {
    addRequest,
    getRequest,
    deleteRequest
}
