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
                        <input className={"margin"} value={user.username.value}/>
                        <select className={"margin visibility"} value={user.username.availableTo}>
                            {visibilities.map((visibility, i) =>
                                <option key={i} value={visibility.id}>{visibility.name}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className={"margin"}>Email</label>
                        <br/>
                        <input className={"margin"} value={user.email.value} disabled/>
                        <select className={"margin visibility"} value={user.email.availableTo}>
                            {visibilities.map((visibility, i) =>
                                <option key={i} value={visibility.id}>{visibility.name}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className={"margin"}>Phone</label>
                        <br/>
                        <input className={"margin"} value={user.phone.value}/>
                        <select className={"margin visibility"} value={user.phone.availableTo}>
                            {visibilities.map((visibility, i) =>
                                <option key={i} value={visibility.id}>{visibility.name}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className={"margin"}>University</label>
                        <br/>
                        <select className={"margin university"} value={user.university.id}>
                            {universities.map((university, i) =>
                                <option key={i} value={university.id}>{university.name}</option>
                            )}
                        </select>
                        <select className={"margin visibility"} value={user.university.availableTo}>
                            {visibilities.map((visibility, i) =>
                                <option key={i} value={visibility.id}>{visibility.name}</option>
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