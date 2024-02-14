import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { USER_API } from "../../constants/api-endpoints";
import { GET_USER } from "../../constants/query-leys";
import User from "../../shared/types/user";
import { apiService } from "../api-service";

export interface GetUserRequest {
  id: number;
}

export type GetUserResponse = User;

const useGetUser = (
  data: GetUserRequest,
  enabled?: boolean
): UseQueryResult<GetUserResponse, Error> => {
  return useQuery({
    queryKey: [GET_USER, data.id],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetUserResponse>({
        path: USER_API.GET_USER(data.id),
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetUser;
