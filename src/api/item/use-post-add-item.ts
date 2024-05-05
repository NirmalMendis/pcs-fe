import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { ITEM_API } from "../../constants/api-endpoints";
import { POST_CREATE_PAWN_TICKET } from "../../constants/query-leys";
import { Item, ItemDetailType } from "../../shared/types/item";
import { apiService } from "../api-service";

export type PostAddItemRequest = Pick<
  Item,
  "description" | "pawningAmount" | "appraisedValue"
> & {
  itemDetails: Array<Pick<ItemDetailType, "type" | "value">>;
  pawnTicketId: number;
};

export type PostAddItemResponse = Item;

const usePostAddItem = (): UseMutationResult<
  PostAddItemResponse,
  Error,
  { payload: PostAddItemRequest }
> => {
  return useMutation({
    mutationKey: [POST_CREATE_PAWN_TICKET],
    mutationFn: ({ payload }) =>
      apiService.postRequest<PostAddItemResponse>({
        path: ITEM_API.ADD_ITEM(payload.pawnTicketId),
        body: payload,
      }),
  });
};

export default usePostAddItem;
