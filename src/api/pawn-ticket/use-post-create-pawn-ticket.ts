import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { PAWN_TICKET_API } from "../../constants/api-endpoints";
import { POST_CREATE_PAWN_TICKET } from "../../constants/query-leys";
import { Item, ItemDetailType } from "../../shared/types/item";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { CreatePawnTicketFormValues } from "../../ui/pages/pawn-ticket/create-ticket/create-pawn-ticket-form";
import { apiService } from "../api-service";

export type PostCreatePawnTicketRequest = Omit<
  CreatePawnTicketFormValues,
  "principalAmount"
> & {
  items: Array<
    Pick<Item, "description" | "pawningAmount" | "appraisedValue"> & {
      itemDetails: Array<Pick<ItemDetailType, "type" | "value">>;
    }
  >;
};

export type PostCreatePawnTicketResponse = PawnTicket;

const usePostCreatePawnTicket = (): UseMutationResult<
  PostCreatePawnTicketResponse,
  Error,
  { payload: PostCreatePawnTicketRequest }
> => {
  return useMutation({
    mutationKey: [POST_CREATE_PAWN_TICKET],
    mutationFn: ({ payload }) =>
      apiService.postRequest<PostCreatePawnTicketResponse>({
        path: PAWN_TICKET_API.POST_CREATE_PAWN_TICKET,
        body: payload,
      }),
  });
};

export default usePostCreatePawnTicket;
