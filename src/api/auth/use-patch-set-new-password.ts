import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AUTH_API } from "../../constants/api-endpoints";
import { SET_NEW_PASSWORD } from "../../constants/query-leys";
import { apiService } from "../api-service";

export interface SetNewPasswordRequest {
  email: string;
  password: string;
  resetToken: string;
}

const usePatchSetNewPassword = (): UseMutationResult<
  void,
  Error,
  { payload: SetNewPasswordRequest }
> => {
  return useMutation({
    mutationKey: [SET_NEW_PASSWORD],
    mutationFn: ({ payload }) =>
      apiService.patchRequest({
        path: AUTH_API.SET_NEW_PASSWORD,
        body: payload,
        includeAccessToken: false,
      }),
  });
};

export default usePatchSetNewPassword;
