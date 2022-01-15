import './user.css';
import {userPropTypes} from "./userPropTypes";

const User = ({user}) => {
    return (
        <div>
            <ShowUser user={user}/>
            <div>friends:
                <div>
                    {user.friends.map((friend, i) =>
                        <ShowUser user={friend} key={i}/>
                    )}
                </div>
            </div>
        </div>
    );
}

function ShowUser({user}) {
    const userKeys = Object.keys(user);
    const fileKeys = Object.keys(user.avatar.file);
    const addressKeys = Object.keys(user.addrr.main);
    return (
        <div>
            <div className={"level1"}>{userKeys[0]}: {user.name}</div>
            <div className={"level1"}>{userKeys[1]}: {user.age}</div>
            <div className={"level1"}>{userKeys[2]}:
                <div className={"level2"}>{Object.keys(user.avatar)}:
                    <div className={"level3"}>{fileKeys[0]}: {user.avatar.file.id}</div>
                    <div className={"level3"}>{fileKeys[1]}: {user.avatar.file.name}</div>
                    <div className={"level3"}>{fileKeys[2]}: {user.avatar.file.path}</div>
                </div>
            </div>
            <div className={"level1"}>{userKeys[3]}:
                <div>{user.files.map((file, i) =>
                    <div key={i}  className={"level2"}>{i}:
                        <div className={"level3"}>{fileKeys[0]}: {file.id}</div>
                        <div className={"level3"}>{fileKeys[1]}: {file.name}</div>
                        <div className={"level3"}>{fileKeys[2]}: {file.path}</div>
                    </div>
                )}</div>
            </div>
            <div className={"level1"}>{userKeys[4]}:
                <div className={"level2"}>{Object.keys(user.addrr)[0]}:
                    <div className={"level3"}>{addressKeys[0]}: {user.addrr.main.line1}</div>
                    <div className={"level3"}>{addressKeys[1]}: {user.addrr.main.line2}</div>
                    <div className={"level3"}>{addressKeys[2]}: {user.addrr.main.city}</div>
                    <div className={"level3"}>{addressKeys[3]}: {user.addrr.main.zip}</div>
                </div>
                <div className={"level2"}>{Object.keys(user.addrr)[1]}:
                    <div className={"level3"}>{addressKeys[0]}: {user.addrr.alt.line1}</div>
                    <div className={"level3"}>{addressKeys[1]}: {user.addrr.alt.line2}</div>
                    <div className={"level3"}>{addressKeys[2]}: {user.addrr.alt.city}</div>
                    <div className={"level3"}>{addressKeys[3]}: {user.addrr.alt.zip}</div>
                </div>
            </div>
        </div>
    );
}

User.propTypes = userPropTypes;

export default User;