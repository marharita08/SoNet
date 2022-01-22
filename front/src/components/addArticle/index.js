import PropTypes from 'prop-types';

import './addArticle.css';

const AddArticle = ({visibilities}) => {
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
                                        {visibilities.map((visibility) =>
                                            <option key={visibility.visibility_id} value={visibility.visibility_id}>
                                                {visibility.visibility}
                                            </option>
                                        )}
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

AddArticle.propTypes = {
    visibilities: PropTypes.arrayOf(PropTypes.shape({
        visibility_id: PropTypes.number.isRequired,
        visibility: PropTypes.string.isRequired
    }))
}

export default AddArticle;
