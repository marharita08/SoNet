import React from "react";
import {Avatar, AvatarGroup, Popover} from "@mui/material";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";
import {usersPopoverPropTypes} from "../../../propTypes/userPropTypes";

const AvatarPopover = ({anchorEl, onClose, users}) => {

    const theme = useTheme();

    return (
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: "none",
            }}
            open={!!anchorEl}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            onClose={onClose}
            disableRestoreFocus
        >
            <AvatarGroup max={4} className={"margin"}>
                {users?.map((user) =>
                    <Avatar
                        key={user.user_id}
                        src={user.avatar}
                        sx={theme.avatarSizes.sm}
                    />
                )}
            </AvatarGroup>
        </Popover>
    );
};

AvatarPopover.propTypes = {
    anchorEl: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    users: usersPopoverPropTypes
};

export default AvatarPopover;
