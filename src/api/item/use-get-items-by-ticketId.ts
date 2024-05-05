import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ITEM_API } from "../../constants/api-endpoints";
import { GET_ITEMS_BY_PAWN_TICKET } from "../../constants/query-leys";
import { OrderPaginatedRequest } from "../../shared/types/generic";
import { Item } from "../../shared/types/item";
import { PaginatedData } from "../../shared/types/paginated-data";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { apiService } from "../api-service";

export interface GetItemsByPawnTicketRequest
  extends Partial<OrderPaginatedRequest>,
    Pick<PawnTicket, "id"> {}

export type GetItemsByPawnTicketResponse = PaginatedData<Item>;

const useGetItemsByPawnTicketId = <T = GetItemsByPawnTicketResponse>(
  { id, page, pageSize, orderBy, orderDirection }: GetItemsByPawnTicketRequest,
  enabled?: boolean
): UseQueryResult<T, Error> => {
  return useQuery({
    queryKey: [
      GET_ITEMS_BY_PAWN_TICKET,
      id,
      ...(page && pageSize ? [page, pageSize] : []),
      ...(orderBy && orderDirection ? [orderBy, orderDirection] : []),
    ],
    queryFn: ({ signal }) =>
      apiService.getRequest<T>({
        path: ITEM_API.GET_ITEMS_BY_PAWN_TICKET_ID(id),
        queryParams: { page, pageSize, orderBy, orderDirection },
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetItemsByPawnTicketId;
