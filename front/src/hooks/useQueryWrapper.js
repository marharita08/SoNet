import {useQuery} from "react-query";

export const useQueryWrapper = (queryKey, getFunction) => {

  const {isFetching, data} = useQuery(
    queryKey, getFunction, {refetchInterval: false, refetchOnWindowFocus: false}
  );

  return {isFetching, data: data?.data};
};
