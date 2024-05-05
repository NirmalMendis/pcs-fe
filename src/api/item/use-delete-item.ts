import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { ITEM_API } from "../../constants/api-endpoints";
import { DELETE_ITEM } from "../../constants/query-leys";
import { Item } from "../../shared/types/item";
import { apiService } from "../api-service";

export type DeleteItemRequest = Pick<Item, "id">;

const useDeleteItem = (): UseMutationResult<
  void,
  Error,
  { payload: DeleteItemRequest }
> => {
  return useMutation({
    mutationKey: [DELETE_ITEM],
    mutationFn: ({ payload }) =>
      apiService.deleteRequest({
        path: ITEM_API.DELETE_ITEM(payload.id),
      }),
  });
};

export default useDeleteItem;
