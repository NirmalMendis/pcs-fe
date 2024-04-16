import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ROLE_API } from "../../constants/api-endpoints";
import { GET_ALL_ROLES } from "../../constants/query-leys";
import { OrderPaginatedRequest } from "../../shared/types/generic";
import { PaginatedData } from "../../shared/types/paginated-data";
import Role from "../../shared/types/role";
import { apiService } from "../api-service";

export type GetAllRolesRequest = Partial<OrderPaginatedRequest>;

export type GetAllRolesResponse = PaginatedData<Role>;

const useGetAllRoles = <T = GetAllRolesResponse>(
  { page, pageSize, orderBy, orderDirection }: GetAllRolesRequest,
  enabled?: boolean
): UseQueryResult<T, Error> => {
  return useQuery({
    queryKey: [
      GET_ALL_ROLES,
      page,
      pageSize,
      ...(orderBy && orderDirection ? [orderBy, orderDirection] : []),
    ],
    queryFn: ({ signal }) =>
      apiService.getRequest<T>({
        path: ROLE_API.GET_ALL_ROLES,
        queryParams: {
          page,
          pageSize,
          orderBy,
          orderDirection,
        },
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetAllRoles;
