const addComment = (comments, comment) => {
    let newComments = [...comments, comment];
    newComments.sort((a, b) => {
        const ap = a.path, bp = b.path;
        if (ap < bp) {
            return -1;
        }
        if (ap > bp) {
            return 1;
        }
        return 0;
    });
    return newComments;
}

const updateComment = (comments, comment) => {
    let newComments = [...comments];
    const index = newComments.findIndex((obj => obj.comment_id === comment.comment_id));
    newComments[index].text = comment.text;
    return newComments;
}

const deleteComment = (comments, id) => {
    return comments.filter((obj => obj.comment_id !== id));
}

export default {
    addComment,
    updateComment,
    deleteComment
}
