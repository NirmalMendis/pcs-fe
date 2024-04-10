import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { STATS_API } from "../../constants/api-endpoints";
import { GET_TICKET_STATUS_STATS } from "../../constants/query-leys";
import { PawnTicketStatusEnum } from "../../shared/types/generic";
import { apiService } from "../api-service";

export type GetTicketStatusStatsResponse = {
  [PawnTicketStatusEnum.ACTIVE]: {
    totalCount: number;
    month: number;
    today: number;
  };
  [PawnTicketStatusEnum.DUE]: {
    totalCount: number;
    totalValue: number;
  };
  [PawnTicketStatusEnum.RECOVERED]: {
    totalCount: number;
    totalValue: number;
  };
  [PawnTicketStatusEnum.FORFEITED]: {
    totalCount: number;
    totalValue: number;
  };
};

const useGetTicketStatusStats = (
  enabled?: boolean
): UseQueryResult<GetTicketStatusStatsResponse, Error> => {
  return useQuery({
    queryKey: [GET_TICKET_STATUS_STATS],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetTicketStatusStatsResponse>({
        path: STATS_API.GET_TICKET_STATUS_STATS,
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetTicketStatusStats;
