import {PostContainer} from "./containers/Post";
import post from "./resources/database.json";

import './App.css';

function App() {
    return (
        <div className="App">
            <PostContainer post={post}/>
        </div>
    );
}

export default App;
