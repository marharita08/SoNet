import './profile.css';

export function Profile() {
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
                        <input className={"margin"}/>
                        <select className={"margin visibility"}>
                            <option>...</option>
                        </select>
                    </div>
                    <div>
                        <label className={"margin"}>Email</label>
                        <br/>
                        <input className={"margin"} value={"example@gmail.com"} disabled={"true"}/>
                        <select className={"margin visibility"}>
                            <option>...</option>
                        </select>
                    </div>
                    <div>
                        <label className={"margin"}>Phone</label>
                        <br/>
                        <input className={"margin"}/>
                        <select className={"margin visibility"}>
                            <option>...</option>
                        </select>
                    </div>
                    <div>
                        <label className={"margin"}>University</label>
                        <br/>
                        <select className={"margin university"}>
                            <option>...</option>
                        </select>
                        <select className={"margin visibility"}>
                            <option>...</option>
                        </select>
                    </div>
                    <div align={"center"}>
                        <button className={"body_button save big_margin"} >Save</button>
                    </div>
                </div>
                <img alt={"user image"} className="circle big_margin user_img" width={100} src={"images/user.png"}/>
            </form>
        </div>
    );
}
