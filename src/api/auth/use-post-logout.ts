import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AUTH_API } from "../../constants/api-endpoints";
import { LOGOUT } from "../../constants/query-leys";
import { apiService } from "../api-service";

const usePostLogout = (): UseMutationResult<void, Error> => {
  return useMutation({
    mutationKey: [LOGOUT],
    mutationFn: () =>
      apiService.postRequest<void>({
        path: AUTH_API.LOGOUT,
      }),
  });
};

export default usePostLogout;
