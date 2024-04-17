import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FUNCTION_API } from "../../constants/api-endpoints";
import { GET_ALL_FUNCTIONS } from "../../constants/query-leys";
import FunctionType from "../../shared/types/function";
import { OrderPaginatedRequest } from "../../shared/types/generic";
import { PaginatedData } from "../../shared/types/paginated-data";
import { apiService } from "../api-service";

export type GetAllFunctionsRequest = Partial<OrderPaginatedRequest>;

export type GetAllFunctionsResponse = PaginatedData<FunctionType>;

const useGetAllFunctions = <T = GetAllFunctionsResponse>(
  { page, pageSize, orderBy, orderDirection }: GetAllFunctionsRequest,
  enabled?: boolean
): UseQueryResult<T, Error> => {
  return useQuery({
    queryKey: [
      GET_ALL_FUNCTIONS,
      page,
      pageSize,
      ...(orderBy && orderDirection ? [orderBy, orderDirection] : []),
    ],
    queryFn: ({ signal }) =>
      apiService.getRequest<T>({
        path: FUNCTION_API.GET_ALL_FUNCTIONS,
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

export default useGetAllFunctions;
