import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { ITEM_API } from "../../constants/api-endpoints";
import { PATCH_ITEM } from "../../constants/query-leys";
import { Item, ItemDetailType } from "../../shared/types/item";
import { apiService } from "../api-service";

export type PatchItemRequest = Pick<
  Item,
  "id" | "description" | "pawningAmount" | "appraisedValue"
> & {
  itemDetails: Array<Pick<ItemDetailType, "type" | "value">>;
};

export type PatchItemResponse = Item;

const usePatchItem = (): UseMutationResult<
  PatchItemResponse,
  Error,
  { payload: PatchItemRequest }
> => {
  return useMutation({
    mutationKey: [PATCH_ITEM],
    mutationFn: ({ payload }) =>
      apiService.patchRequest<PatchItemResponse>({
        path: ITEM_API.PATCH_ITEM(payload.id),
        body: payload,
      }),
  });
};

export default usePatchItem;
