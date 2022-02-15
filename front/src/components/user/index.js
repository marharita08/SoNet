import './user.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import env from "../../config/envConfig";
import {Avatar, Card, CardHeader, IconButton, Typography} from "@mui/material";

const User = ({user}) => {

    const handleClose = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Link to={"/profile/" + user.user_id} onClick={'update'}>
                <Card className={'inline margin width_100'}>
                    <CardHeader
                        avatar={
                            <Avatar
                                alt={user?.name}
                                src={`${env.apiUrl}${user.avatar}`}
                                sx={{ width: 50, height: 50 }}
                            />
                        }
                        action={
                            <IconButton className="closebtn" onClick={handleClose}>
                                <span>&times;</span>
                            </IconButton>
                        }
                        title={
                            <Typography sx={{"font-weight": "bold"}}>
                                {user.name}
                            </Typography>
                        }
                    />
                </Card>
            </Link>
        </>
    );
}

User.propTypes = {
    user: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    })
};

export default User;
