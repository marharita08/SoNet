import {Post} from "../../components/Post";

export function PostContainer({post}) {
    const username = post.post.author.name;
    const userPhoto = post.post.author.photo;
    const photo = post.post.photo;
    const description = post.post.description;
    const likes = post.post.likes;
    return <Post username={username} userPhoto={userPhoto} photo={photo} description={description} likes={likes} />
}
