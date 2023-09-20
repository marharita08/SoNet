const addRequest = (usersForSearch, request) => {
    let newUsersForSearch = [...usersForSearch];
    const index = newUsersForSearch.findIndex((obj => obj.user_id === request.user_id));
    newUsersForSearch[index].is_not_friends = false;
    newUsersForSearch[index].is_outgoing_request = true;
    newUsersForSearch[index].request_id = request.request_id;
    return newUsersForSearch;
}

const acceptRequest = (usersForSearch, request_id) => {
    let newUsersForSearch = [...usersForSearch];
    const index = newUsersForSearch.findIndex((obj => obj.request_id === request_id));
    newUsersForSearch[index].is_incoming_request = false;
    newUsersForSearch[index].is_friends = true;
    return newUsersForSearch;
}

const deleteRequest = (usersForSearch, request_id) => {
    let newUsersForSearch = [...usersForSearch];
    const index = newUsersForSearch.findIndex((obj => (+obj.request_id) === (+request_id)));
    newUsersForSearch[index].is_outgoing_request = false;
    newUsersForSearch[index].is_friends = false;
    newUsersForSearch[index].is_not_friends = true;
    newUsersForSearch[index].request_id = undefined;
    return newUsersForSearch;
}

export default {
    addRequest,
    acceptRequest,
    deleteRequest
}
