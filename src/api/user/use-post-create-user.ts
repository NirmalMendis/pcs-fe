import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { USER_API } from "../../constants/api-endpoints";
import { POST_CREATE_USER } from "../../constants/query-leys";
import User from "../../shared/types/user";
import { CRUUserFormValues } from "../../ui/pages/iam/user-management/cru-user-form";
import { apiService } from "../api-service";

export type PostCreateUserRequest = CRUUserFormValues & {
  activeBranchId: number;
};

export type PostCreateUserResponse = Pick<
  User,
  | "id"
  | "name"
  | "firstName"
  | "lastName"
  | "email"
  | "mobileNo"
  | "activeBranchId"
>;

const usePostCreateUser = (): UseMutationResult<
  PostCreateUserResponse,
  Error,
  { payload: PostCreateUserRequest }
> => {
  return useMutation({
    mutationKey: [POST_CREATE_USER],
    mutationFn: ({ payload }) =>
      apiService.postRequest<PostCreateUserResponse>({
        path: USER_API.POST_CREATE_USER,
        body: payload,
      }),
  });
};

export default usePostCreateUser;
