import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { USER_API } from "../../constants/api-endpoints";
import { GET_ALL_USER } from "../../constants/query-leys";
import { OrderPaginatedRequest } from "../../shared/types/generic";
import { PaginatedData } from "../../shared/types/paginated-data";
import User from "../../shared/types/user";
import { apiService } from "../api-service";

export type GetAllUsersRequest = OrderPaginatedRequest;

export type GetUsersResponse = PaginatedData<User>;

const useGetAllUsers = (
  { page, pageSize, orderBy, orderDirection }: GetAllUsersRequest,
  enabled?: boolean
): UseQueryResult<GetUsersResponse, Error> => {
  return useQuery({
    queryKey: [
      GET_ALL_USER,
      page,
      pageSize,
      ...(orderBy && orderDirection ? [orderBy, orderDirection] : []),
    ],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetUsersResponse>({
        path: USER_API.GET_ALL_USERS,
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

export default useGetAllUsers;
