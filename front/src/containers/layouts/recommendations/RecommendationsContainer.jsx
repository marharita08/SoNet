import React from "react";
import {getRecommendations} from "../../../api/recommendationsCrud";
import UserCards from "../../../components/layouts/userCards/UserCards";
import {useLocationCountry} from "./useLocationCountry";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";

const RecommendationsContainer = ({id, recommendations, actions}) => {

  const {setRecommendations, addToFriends, handleHideRecommendation} = actions;

  const country = useLocationCountry();

  const {isFetching} = useQueryWrapper(
    `recommendations-${id}-${country}`,
    () => getRecommendations(id, country),
    {
      onSuccess: (data) => setRecommendations(data?.data),
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
