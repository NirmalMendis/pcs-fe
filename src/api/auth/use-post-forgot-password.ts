import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AUTH_API } from "../../constants/api-endpoints";
import { FORGOT_PASSWORD } from "../../constants/query-leys";
import { apiService } from "../api-service";

export interface ForgptPasswordRequest {
  email: string;
}

const usePostForgotPassword = (): UseMutationResult<
  void,
  Error,
  { payload: ForgptPasswordRequest }
> => {
  return useMutation({
    mutationKey: [FORGOT_PASSWORD],
    mutationFn: ({ payload }) =>
      apiService.postRequest({
        path: AUTH_API.FORGOT_PASSWORD,
        body: payload,
        includeAccessToken: false,
      }),
  });
};

export default usePostForgotPassword;
