import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { PAWN_TICKET_API } from "../../constants/api-endpoints";
import { PATCH_UPDATE_PAWN_TICKET_GENERAL } from "../../constants/query-leys";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { apiService } from "../api-service";

export type PatchUpdatePawnTicketGeneralRequest = Pick<PawnTicket, "id"> &
  Partial<
    Pick<
      PawnTicket,
      | "id"
      | "serviceCharge"
      | "pawnDate"
      | "customerId"
      | "interestRate"
      | "periodInMonths"
      | "status"
    >
  >;

export type PatchUpdatePawnTicketGeneralResponse = PawnTicket;

const usePatchUpdatePawnTicketGeneral = (): UseMutationResult<
  PatchUpdatePawnTicketGeneralResponse,
  Error,
  { payload: PatchUpdatePawnTicketGeneralRequest }
> => {
  return useMutation({
    mutationKey: [PATCH_UPDATE_PAWN_TICKET_GENERAL],
    mutationFn: ({ payload }) => {
      const { id, ...rest } = payload;
      return apiService.patchRequest<PatchUpdatePawnTicketGeneralResponse>({
        path: PAWN_TICKET_API.PATCH_UPDATE_PAWN_TICKET_GENERAL(id),
        body: rest,
      });
    },
  });
};

export default usePatchUpdatePawnTicketGeneral;
