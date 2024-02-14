import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AUTH_API } from "../../constants/api-endpoints";
import { LOGIN } from "../../constants/query-leys";
import User from "../../shared/types/user";
import { apiService } from "../api-service";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: Pick<User, "id" | "email" | "firstName" | "lastName">;
}

const usePostLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  { payload: LoginRequest }
> => {
  return useMutation({
    mutationKey: [LOGIN],
    mutationFn: ({ payload }) =>
      apiService.postRequest<LoginResponse>({
        path: AUTH_API.LOGIN,
        body: payload,
        includeAccessToken: false,
      }),
  });
};

export default usePostLogin;
