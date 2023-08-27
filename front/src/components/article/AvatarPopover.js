import React from "react";
import {Avatar, AvatarGroup, Popover} from "@mui/material";
import PropTypes from "prop-types";

const AvatarPopover = ({anchorEl, onClose, users}) => {
    return (
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            onClose={onClose}
            disableRestoreFocus
        >
            <AvatarGroup max={4} className={'margin'}>
                {users?.map((user) =>
                    <Avatar
                        key={user.user_id}
                        src={user.avatar}
                    />
                )}
            </AvatarGroup>
        </Popover>
    )
}

AvatarPopover.propTypes = {
    anchorEl: PropTypes.object,
    onClose: PropTypes.func,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            user_id: PropTypes.number.isRequired,
            avatar: PropTypes.string
        })
    )
}

export default AvatarPopover;
