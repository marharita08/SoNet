import {useQuery} from "react-query";

export const useQueryWrapper = (queryKey, queryFn, options) => {

  const {isFetching, isLoading, data} = useQuery(
    queryKey, queryFn, {refetchInterval: false, refetchOnWindowFocus: false, ...options}
  );

  return {isFetching, isLoading, data: data?.data};
};
