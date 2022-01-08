import './addArticle.css';

export function AddArticle() {
    return (
        <div className={"add_article_outer"}>
            <div className={"add_article_inner"}>
                <h1>Add article</h1>
                <form>
                    <div>
                        <textarea className={"margin"}/>
                        <div align={"center"}>
                            <div className={"available"}>
                                <div className={"margin"} align={"left"}>
                                    Available to
                                    <select className={"margin"}>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div align={"center"}>
                        <div className={"buttons"}>
                            <button className={"body_button margin cancel"}>Cancel</button>
                            <button className={"body_button margin add"}>Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}