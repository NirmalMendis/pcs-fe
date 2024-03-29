import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { USER_API } from "../../constants/api-endpoints";
import { PERMISSIONS } from "../../constants/iam-constants";
import { GET_USER_PERMISSIONS } from "../../constants/query-leys";
import { apiService } from "../api-service";

export type Permission = {
  title: PERMISSIONS;
  category: string;
};

export type GetUserResponse = {
  view: Array<Permission>;
  create: Array<Permission>;
  update: Array<Permission>;
  delete: Array<Permission>;
};

const useGetUserPermissions = (
  enabled?: boolean
): UseQueryResult<GetUserResponse, Error> => {
  return useQuery({
    queryKey: [GET_USER_PERMISSIONS],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetUserResponse>({
        path: USER_API.GET_USER_PERMISSIONS,
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetUserPermissions;
