import React from "react";
import LinkToProfile from "../../atoms/links/LinkToProfile";
import {Avatar} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {userForSearchPropTypes} from "../../../propTypes/userPropTypes";
import {useStyles} from "./style";

const SearchUsersOptionUser = ({user}) => {

    const theme = useTheme();
    const classes = useStyles();

    return (
        <LinkToProfile
            user_id={user.user_id}
            className={classes.link}
            content={
                <>
                    <Avatar
                        src={user.avatar}
                        className={classes.avatar}
                        sx={theme.avatarSizes.sm}
                    />
                    <span>
                        {user.name}
                    </span>
                </>
            }
        />
    );
};

SearchUsersOptionUser.propTypes = {
    user: userForSearchPropTypes
}

export default SearchUsersOptionUser;
