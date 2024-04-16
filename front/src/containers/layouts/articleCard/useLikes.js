import {useState} from "react";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";
import {getLikes, getLikesAmount} from "../../../api/articlesCrud";
import {deleteLike, getIsLiked, insertLike} from "../../../api/likesCrud";
import {useMutation} from "react-query";

export const useLikes = (article_id, user, onError) => {

  const [likedUsers, setLikedUsers] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesAmount, setLikesAmount] = useState(0);

  const {user_id, avatar} = user;

  const {isFetching: isLikesFetching} = useQueryWrapper(
    `users ${article_id}`,
    () => getLikes(article_id), {
      onSuccess: (data) => setLikedUsers(data?.data)
    }
  );

  const {isFetching: isIsLikedFetching} = useQueryWrapper(
    `is liked ${article_id}-${user_id}`,
    () => getIsLiked(article_id), {
      onSuccess: (data) => setIsLiked(data?.data)
    }
  );

  const {isFetching: isLikesAmountFetching} = useQueryWrapper(
    `likes amount ${article_id}`,
    () => getLikesAmount(article_id), {
      onSuccess: (data) => setLikesAmount(+data?.data.count)
    }
  );

  const {mutate: addLikeMutate} = useMutation(insertLike, {
    onSuccess: () => {
      setLikedUsers([...likedUsers, {user_id, avatar}]);
      setLikesAmount(likesAmount + 1);
      setIsLiked(true);
    },
    onError
  });

  const {mutate: deleteLikeMutate} = useMutation(deleteLike, {
    onSuccess: () => {
      setLikedUsers(likedUsers.filter(((obj) => obj.user_id !== user_id)));
      setLikesAmount(likesAmount - 1);
      setIsLiked(false);
    },
    onError
  });

  const like = () => {
    if (!isLiked) {
      addLikeMutate({article_id});
    } else {
      deleteLikeMutate(article_id);
    }
  }

  return {likedUsers, likesAmount, isLiked, like, isLikesFetching: isLikesFetching || isLikesAmountFetching || isIsLikedFetching}
}
