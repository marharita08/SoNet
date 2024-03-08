import React, {useState} from "react";
import {useQuery} from "react-query";
import {refetchOff} from "../../../config/refetchOff";
import {getRecommendations} from "../../../api/recommendationsCrud";
import UserCards from "../../../components/layouts/userCards/UserCards";

const RecommendationsContainer = ({id}) => {

  const [recommendations, setRecommendations] = useState();
  const {isFetching} = useQuery(
    "recommendations",
    () => getRecommendations(id),
    {
      onSuccess: (data) => setRecommendations(data?.data),
      ...refetchOff
    }
  );


  return (
    <UserCards
      heading={"Recommendations"}
      isFetching={isFetching}
      users={recommendations}
    />
  )
}

export default RecommendationsContainer;
