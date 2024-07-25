import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RetreatsType } from "../services/api-client";
import APIClient from "../services/api-client";

const apiClient = new APIClient();

const useRetreats = () => {
  return useQuery<RetreatsType[]>({
    queryKey: ["retreats"],
    queryFn: () => apiClient.getAllRetreats(),
    placeholderData: keepPreviousData,
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });
};

export default useRetreats;
