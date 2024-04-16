import {useState} from "react";

import {getCountOfAllNews, getCountOfNews} from "../../../api/articlesCrud";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";

export const useLoadMoreVisibility = (param, user_id, articlesAmount) => {

  const [articlesTotalAmount, setArticlesTotalAmount] = useState();

  let getCountFunc;

  if (param === "news") {
    getCountFunc = getCountOfNews;
  } else if (param === "all") {
    getCountFunc = getCountOfAllNews;
  }

  const {isFetching: isCountFetching} = useQueryWrapper(
    `articles amount ${param} ${user_id}`,
    getCountFunc,
    {
      onSuccess: (data) => setArticlesTotalAmount(data?.data.count)
    }
  );

  return {isCountFetching, isLoadMoreVisible: articlesTotalAmount > articlesAmount}
}
