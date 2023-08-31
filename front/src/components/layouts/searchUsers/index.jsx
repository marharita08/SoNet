import React from "react";
import {Autocomplete, Avatar, Box, CircularProgress, IconButton, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import "./search.css";
import {useTheme} from "@mui/material/styles";

const SearchUsers = ({users, addToFriends, accept, deleteFromFriends, isFetching}) => {

    const theme = useTheme();

    return (
        <>
            <Autocomplete
                className={"search-width margin"}
                options={users}
                freeSolo
                getOptionLabel={(option) => `${option.name} ${option.email}`}
                groupBy={(option) => option.name[0].toUpperCase()}
                renderOption={(props, option) => (
                    <div key={option.user_id}>
                        <Link
                            to={`/profile/${option.user_id}`}
                            className={"search-item inline"}
                        >
                            <Box component="li">
                                <span className={"inline"}>
                                    <Avatar
                                        src={option.avatar}
                                        className={"margin"}
                                        sx={theme.avatarSizes.sm}
                                    />
                                </span>
                                <span className={"inline"}>
                                    {option.name}
                                </span>
                            </Box>
                        </Link>
                        <IconButton>
                            {
                                (option.is_friends || option.is_outgoing_request) ?
                                    <PersonRemoveIcon onClick={() => deleteFromFriends(option.request_id)}/> :
                                    <PersonAddIcon
                                        onClick={() => {
                                            option.is_not_friends ? addToFriends(option.user_id) :
                                                accept(option.request_id);
                                        }}
                                    />
                            }
                        </IconButton>
                    </div>
                )}
                renderInput={props =>
                    <Box className={"search-field"}>
                        {
                            isFetching ? <CircularProgress color="inherit" size={25}/> :
                                <SearchIcon sx={{color: "action.active"}}/>
                        }
                        <TextField
                            {...props}
                            variant="standard"
                            label={"Search"}
                        />
                    </Box>
                }
            />
        </>
    );
};

SearchUsers.propTypes = {
    addToFriends: PropTypes.func.isRequired,
    accept: PropTypes.func.isRequired,
    deleteFromFriends: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            request_id: PropTypes.number,
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string,
            avatar: PropTypes.string,
            is_not_friends: PropTypes.bool,
            is_friends: PropTypes.bool,
            is_incoming_request: PropTypes.bool,
            is_outgoing_request: PropTypes.bool
        })
    ),
    isFetching: PropTypes.bool
};

export default SearchUsers;
