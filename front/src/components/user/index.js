import './user.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const User = ({user}) => {
    return (
        <>
            <Link to={"/profile/" + user.user_id} onClick={'update'}>
                <div className={'background inline margin width_100'}>
                    <span className="closebtn" >&times;</span>
                    <div className={'padding'}>
                        <div className="inline margin">
                            <img alt={"user image"} className="circle" width={50} src={user.avatar}/>
                        </div>
                        <div className="inline name">
                            {user.name}
                        </div>
                    </div>
                </div>
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