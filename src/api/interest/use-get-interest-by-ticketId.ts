import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { INTEREST_API } from "../../constants/api-endpoints";
import { GET_INTERETS_BY_PAWN_TICKET } from "../../constants/query-leys";
import { OrderPaginatedRequest } from "../../shared/types/generic";
import { Interest } from "../../shared/types/interest";
import { PaginatedData } from "../../shared/types/paginated-data";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { apiService } from "../api-service";

export interface GetInterestsByPawnTicketRequest
  extends OrderPaginatedRequest,
    Pick<PawnTicket, "id"> {}

export type GetInterestsByPawnTicketResponse = PaginatedData<Interest>;

const useGetInterestsByPawnTicketId = (
  {
    id,
    page,
    pageSize,
    orderBy,
    orderDirection,
  }: GetInterestsByPawnTicketRequest,
  enabled?: boolean
): UseQueryResult<GetInterestsByPawnTicketResponse, Error> => {
  return useQuery({
    queryKey: [GET_INTERETS_BY_PAWN_TICKET, id],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetInterestsByPawnTicketResponse>({
        path: INTEREST_API.GET_INTERESTS_BY_PAWN_TICKET_ID(id),
        queryParams: { page, pageSize, orderBy, orderDirection },
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetInterestsByPawnTicketId;
