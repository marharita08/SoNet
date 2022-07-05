import React from "react";
import env from "../../config/envConfig";
import {Autocomplete, Avatar, Box, IconButton, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {Link} from "react-router-dom";

const SearchUsers = ({users, addToFriends, accept, deleteFromFriends}) => {
    return (
        <>
            <Autocomplete
                sx={{ width: 400 }}
                options={users}
                freeSolo
                getOptionLabel={(option) => `${option.name} ${option.email}`}
                groupBy={(option) => option.name[0].toUpperCase()}
                renderOption={(props, option) => (
                    <div key={option.user_id}>
                        <Link
                            to={`/profile/${option.user_id}`}
                            onClick={'update'}
                            style={{textDecoration: 'none'}}
                            className={'inline'}
                        >
                            <Box component="li" className={'search'} sx={{width: 300, padding: '5px'}}>
                                <div className={'inline'}>
                                    <Avatar
                                        src={`${env.apiUrl}${option.avatar}`}
                                        sx={{width: 30, height: 30}}
                                        className={'margin'}
                                    />
                                </div>
                                <div className={'inline'}>
                                    {option.name}
                                </div>
                            </Box>
                        </Link>
                        <div style={{alignContent: 'right'}} className={'inline'}>
                            <IconButton>
                                {
                                    (option.status === 'friends' || option.status === 'outgoing request') ?
                                    <PersonRemoveIcon
                                        onClick={() => deleteFromFriends(option.user_id)}
                                    /> :
                                    <PersonAddIcon
                                        onClick={() => {
                                            option.status === 'not friends' ? addToFriends(option.user_id) :
                                            accept(option.user_id)
                                        }}
                                    />
                                }
                            </IconButton>
                        </div>
                    </div>
                )}
                renderInput={props =>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <SearchIcon sx={{ color: 'action.active' }} />
                        <TextField
                            {...props}

                            variant="standard"
                            label={'Search'}
                        />
                    </Box>

                }
            />
        </>
    );
}

export default SearchUsers;