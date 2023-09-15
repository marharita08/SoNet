const addComment = (comments, comment) => {
    let newCommentsArray = [...comments, comment];
    newCommentsArray.sort((a, b) => {
        const ap = a.path, bp = b.path;
        if (ap < bp) {
            return -1;
        }
        if (ap > bp) {
            return 1;
        }
        return 0;
    });
    return newCommentsArray;
}

const updateComment = (comments, comment) => {
    let newCommentsArray = [...comments];
    const index = newCommentsArray.findIndex((obj => obj.comment_id === comment.comment_id));
    newCommentsArray[index].text = comment.text;
    return newCommentsArray;
}

const deleteComment = (comments, id) => {
    let newCommentsArray = [...comments];
    const index = newCommentsArray.findIndex((obj => obj.comment_id === id));
    newCommentsArray.splice(index, 1);
    return newCommentsArray;
}

export default {
    addComment,
    updateComment,
    deleteComment
}
