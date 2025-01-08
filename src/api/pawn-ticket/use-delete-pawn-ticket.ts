import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { PAWN_TICKET_API } from "../../constants/api-endpoints";
import { DELETE_PAWN_TICKET } from "../../constants/query-leys";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { apiService } from "../api-service";

export type PatchDeletePawnTicketRequest = Pick<PawnTicket, "id">;

const useDeletePawnTicket = (): UseMutationResult<
  void,
  Error,
  { payload: PatchDeletePawnTicketRequest }
> => {
  return useMutation({
    mutationKey: [DELETE_PAWN_TICKET],
    mutationFn: ({ payload }) =>
      apiService.deleteRequest({
        path: PAWN_TICKET_API.DELETE(payload.id),
        body: payload,
      }),
  });
};

export default useDeletePawnTicket;
