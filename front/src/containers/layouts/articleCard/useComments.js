import {useState} from "react";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";
import {getComments, getCommentsAmount} from "../../../api/articlesCrud";
import commentsService from "../../../services/commentsService";

export const useComments = (article_id) => {

  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsAmount, setCommentsAmount] = useState(0);

  const {isFetching: isCommentsFetching} = useQueryWrapper(
    `comments ${article_id}`,
    () => getComments(article_id), {
      onSuccess: (data) => setComments(data?.data)
    }
  );

  const {isFetching: isCommentsAmountFetching} = useQueryWrapper(
    `comments amount ${article_id}`,
    () => getCommentsAmount(article_id), {
      onSuccess: (data) => setCommentsAmount(+data?.data.count)
    }
  );

  const openComments = () => {
    setIsCommentsExpanded(true);
  }

  const toggleComments = () => {
    setIsCommentsExpanded(!isCommentsExpanded);
  }

  const addComment = (comment) => {
    openComments();
    setComments(commentsService.addComment(comments, comment));
    setCommentsAmount(commentsAmount + 1);
  }

  const updateComment = (comment) => {
    openComments();
    setComments(commentsService.updateComment(comments, comment));
  }

  const deleteComment = (id) => {
    setComments(commentsService.deleteComment(comments, id));
    setCommentsAmount(commentsAmount - 1);
  }

  return {
    isCommentsExpanded,
    comments,
    commentsAmount,
    toggleComments,
    addComment,
    updateComment,
    deleteComment,
    isCommentsFetching: isCommentsFetching || isCommentsAmountFetching
  }
}
