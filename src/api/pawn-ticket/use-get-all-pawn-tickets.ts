import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { PAWN_TICKET_API } from "../../constants/api-endpoints";
import { GET_ALL_PAWN_TICKETS } from "../../constants/query-leys";
import { PaginatedData } from "../../shared/types/paginated-data";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { apiService } from "../api-service";

export interface GetAllPawnTicketsRequest {
  page: number;
  pageSize: number;
}

export type GetAllPawnTicketsResponse = PaginatedData<PawnTicket>;

const useGetAllPawnTickets = (
  { page, pageSize }: GetAllPawnTicketsRequest,
  enabled?: boolean
): UseQueryResult<GetAllPawnTicketsResponse, Error> => {
  return useQuery({
    queryKey: [GET_ALL_PAWN_TICKETS, page, pageSize],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetAllPawnTicketsResponse>({
        path: PAWN_TICKET_API.GET_ALL_PAWN_TICEKTS,
        queryParams: { page, pageSize },
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetAllPawnTickets;
