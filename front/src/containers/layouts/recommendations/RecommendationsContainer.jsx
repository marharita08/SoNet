import React from "react";
import {useQuery} from "react-query";
import {refetchOff} from "../../../config/refetchOff";
import {getRecommendations} from "../../../api/recommendationsCrud";
import UserCards from "../../../components/layouts/userCards/UserCards";

const RecommendationsContainer = ({id, recommendations, actions}) => {

  const {setRecommendations, addToFriends, handleHideRecommendation} = actions;
  const {isFetching} = useQuery(
    "recommendations",
    () => getRecommendations(id),
    {
      onSuccess: (data) => setRecommendations(data?.data),
      ...refetchOff
    }
  );

  const addRequest = (user_id) => {
    addToFriends(id, user_id);
  }

  return (
    <UserCards
      heading={"Recommendations"}
      isFetching={isFetching}
      users={recommendations}
      addRequest={addRequest}
      hideRecommendation={handleHideRecommendation}
      isRecommendation={true}
      isMenu={true}
    />
  )
}

export default RecommendationsContainer;
