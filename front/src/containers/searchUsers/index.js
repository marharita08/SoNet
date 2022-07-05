import SearchUsers from "../../components/searchUsers";
import {useQuery} from "react-query";
import {getForSearch} from "../../api/usersCrud";
import React, {useContext} from "react";
import authContext from "../../context/authContext";

const SearchUsersContainer = ({addMutate, acceptMutate, deleteMutate}) => {

    const {user:{user_id}} = useContext(authContext);

    const {data} = useQuery('users', () => getForSearch(user_id));
    const users = data?.data;

    const addToFriends = (id) => {
        addMutate({
            from_user_id: user_id,
            to_user_id: id
        });
    }

    const accept = (id) => {
        acceptMutate({
            to_user_id: user_id,
            from_user_id: id
        });
    }

    const deleteFromFriends = (id) => {
        deleteMutate({
            current_user_id: user_id,
            user_id: id
        });
    }

    return (
        <SearchUsers
            users={users}
            accept={accept}
            addToFriends={addToFriends}
            deleteFromFriends={deleteFromFriends}
        />
    );
}

export default SearchUsersContainer;
