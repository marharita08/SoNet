import './articles.css';

export function Articles() {
    return (
        <div>
            <div className="article_outer">
                <div className="article_inner">
                    <div>
                        <div className="inline margin">
                            <img alt={"user image"} className="circle" width={50} src={"images/user.png"}/>
                        </div>
                        <div className="inline name">
                            Username
                        </div>
                    </div>
                    <div className="date margin">
                        date time
                    </div>
                    <div className="margin">
                        text
                    </div>
                    <div className="line" align={"center"}>
                        <div className="inline margin comments">
                            comments
                        </div>
                        <div className={"inline"}>
                        <button className={"body_button"}>
                            Add comment
                        </button>
                        </div>
                        <div className="likes">
                            <img alt={"like"} width={20} src="images/like.svg" className="inline margin"/>
                            <div className="inline margin">likes</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
