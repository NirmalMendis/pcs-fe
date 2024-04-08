import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { INVOICE_API } from "../../constants/api-endpoints";
import { POST_DRAFT_TICKET_INVOICE } from "../../constants/query-leys";
import { Item, ItemDetailType } from "../../shared/types/item";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { apiService } from "../api-service";

export interface PostDraftTicketInvoiceRequest {
  customerId: number;
  items: Array<
    Pick<Item, "appraisedValue" | "description" | "pawningAmount"> & {
      itemDetails: Array<Pick<ItemDetailType, "type" | "value">>;
    }
  >;
  pawnTicket: Pick<
    PawnTicket,
    | "dueDate"
    | "interestRate"
    | "principalAmount"
    | "serviceCharge"
    | "pawnDate"
  >;
}

export type PostDraftTicketInvoiceResponse = Blob;

const usePostDraftTicketInvoice = (): UseMutationResult<
  PostDraftTicketInvoiceResponse,
  Error,
  { payload: PostDraftTicketInvoiceRequest }
> => {
  return useMutation({
    mutationKey: [POST_DRAFT_TICKET_INVOICE],
    mutationFn: ({ payload }) =>
      apiService.postRequest<PostDraftTicketInvoiceResponse>({
        path: INVOICE_API.POST_DRAFT_TICKET_INVOICE,
        body: payload,
        responseType: "blob",
      }),
  });
};

export default usePostDraftTicketInvoice;
