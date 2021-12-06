import './post.css';

export function Post({username, userPhoto, photo, description, likes}) {
    return (
        <div className="outer">
            <div className="inner">
                <div>
                    <div className="inline margin">
                        <img className="circle" width={50} src={userPhoto}/>
                    </div>
                    <div className="inline name">
                        {username}
                    </div>
                </div>
                <div>
                    <img width={300} src={photo}/>
                </div>
                <div>
                    <img width={20} src="images/like.svg" className="inline margin"/>
                    <div className="inline margin">{likes}</div>
                </div>
                <div className="margin">
                    <p><span className="name">{username}</span>{description}</p>
                </div>
            </div>
        </div>
    );
}
