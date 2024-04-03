import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { PAWN_TICKET_API } from "../../constants/api-endpoints";
import { PATCH_UPDATE_INVOICE } from "../../constants/query-leys";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { apiService } from "../api-service";

export type PatchUpdateInvoiceRequest = Pick<PawnTicket, "id">;

export type PatchUpdateInvoiceResponse = object;

const usePatchUpdateInvoice = (): UseMutationResult<
  PatchUpdateInvoiceResponse,
  Error,
  { payload: PatchUpdateInvoiceRequest }
> => {
  return useMutation({
    mutationKey: [PATCH_UPDATE_INVOICE],
    mutationFn: ({ payload }) =>
      apiService.patchRequest<PatchUpdateInvoiceResponse>({
        path: PAWN_TICKET_API.PATCH_UPDATE_INVOICE(payload.id),
        body: payload,
      }),
  });
};

export default usePatchUpdateInvoice;
