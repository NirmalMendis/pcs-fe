import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { PAWN_TICKET_API } from "../../constants/api-endpoints";
import { GET_PAWN_TICKET_BY_ID } from "../../constants/query-leys";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { apiService } from "../api-service";

export interface GetPawnTicketByIdRequest {
  id: number;
}

export type GetPawnTicketByIdResponse = PawnTicket;

const useGetPawnTicketById = (
  { id }: GetPawnTicketByIdRequest,
  enabled?: boolean
): UseQueryResult<GetPawnTicketByIdResponse, Error> => {
  return useQuery({
    queryKey: [GET_PAWN_TICKET_BY_ID, id],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetPawnTicketByIdResponse>({
        path: PAWN_TICKET_API.GET_PAWN_TICKET_BY_ID(id),
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetPawnTicketById;
