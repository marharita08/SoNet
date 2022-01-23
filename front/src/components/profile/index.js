import './profile.css';
import {ProfilePropTypes} from "./profilePropTypes";

const Profile = ({user, universities, visibilities}) => {
    return (
        <div>
            <h1 className={"big_margin"}>My profile</h1>
            <form>
                <div className={"inline big_margin"}>
                    <div>
                        <div className={"label_name margin inline"}>
                            <label>Name</label>
                        </div>
                        <label className={"margin"}>Available to</label>
                        <br/>
                        <input className={"margin"} value={user.name}/>
                        <select className={"margin visibility"} value={user.name_visibility_id}>
                            {visibilities?.map((visibility, i) =>
                                <option key={i} value={visibility.visibility_id}>{visibility.visibility}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className={"margin"}>Email</label>
                        <br/>
                        <input className={"margin"} value={user.email} disabled/>
                        <select className={"margin visibility"} value={user.email_visibility_id}>
                            {visibilities?.map((visibility, i) =>
                                <option key={i} value={visibility.visibility_id}>{visibility.visibility}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className={"margin"}>Phone</label>
                        <br/>
                        <input className={"margin"} value={user.phone}/>
                        <select className={"margin visibility"} value={user.phone_visibility_id}>
                            {visibilities?.map((visibility, i) =>
                                <option key={i} value={visibility.visibility_id}>{visibility.visibility}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className={"margin"}>University</label>
                        <br/>
                        <select className={"margin university"} value={user.university_id}>
                            <option value={undefined}>Not chosen</option>
                            {universities?.map((university, i) =>
                                <option key={i} value={university.university_id}>{university.name}</option>
                            )}
                        </select>
                        <select className={"margin visibility"} value={user.university_visibility_id}>
                            {visibilities?.map((visibility, i) =>
                                <option key={i} value={visibility.visibility_id}>{visibility.visibility}</option>
                            )}
                        </select>
                    </div>
                    <div align={"center"}>
                        <button className={"body_button save big_margin"} >Save</button>
                    </div>
                </div>
                <img alt={"user image"} className="circle big_margin user_img" width={100} src={user.avatar}/>
            </form>
        </div>
    );
}

Profile.propTypes = ProfilePropTypes;

export default Profile;
