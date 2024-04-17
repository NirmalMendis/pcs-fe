import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { ROLE_API } from "../../constants/api-endpoints";
import { POST_CREATE_ROLE } from "../../constants/query-leys";
import Role from "../../shared/types/role";
import { CRURoleFormValues } from "../../ui/pages/iam/role-management/cru-role";
import { apiService } from "../api-service";

export type PostCreateRoleRequest = CRURoleFormValues & {
  functions: Array<object>;
};

export type PostCreateRoleResponse = Pick<Role, "id" | "title" | "status">;

const usePostCreateRole = (): UseMutationResult<
  PostCreateRoleResponse,
  Error,
  { payload: PostCreateRoleRequest }
> => {
  return useMutation({
    mutationKey: [POST_CREATE_ROLE],
    mutationFn: ({ payload }) =>
      apiService.postRequest<PostCreateRoleResponse>({
        path: ROLE_API.POST_CREATE_ROLE,
        body: payload,
      }),
  });
};

export default usePostCreateRole;
