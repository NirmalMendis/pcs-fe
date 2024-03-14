import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { USER_API } from "../../constants/api-endpoints";
import { PATCH_USER_ACTIVE_BRANCH } from "../../constants/query-leys";
import User from "../../shared/types/user";
import { apiService } from "../api-service";

export type PatchUserActiveBranchRequest = Pick<User, "activeBranchId">;

const usePatchUserActiveBranch = (): UseMutationResult<
  void,
  Error,
  { payload: PatchUserActiveBranchRequest }
> => {
  return useMutation({
    mutationKey: [PATCH_USER_ACTIVE_BRANCH],
    mutationFn: ({ payload }) =>
      apiService.patchRequest<void>({
        path: USER_API.PATCH_USER_ACTIVE_BRANCH,
        body: payload,
      }),
  });
};

export default usePatchUserActiveBranch;
