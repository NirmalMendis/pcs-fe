import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { CUSTOMER_API } from "../../constants/api-endpoints";
import { GET_ALL_CUSTOMERS } from "../../constants/query-leys";
import Customer from "../../shared/types/customer";
import { OrderPaginatedRequest } from "../../shared/types/generic";
import { PaginatedData } from "../../shared/types/paginated-data";
import { apiService } from "../api-service";

export type GetAllCustomersRequest = OrderPaginatedRequest;

export type GetCustomersResponse = PaginatedData<Customer>;

const useGetAllCustomers = (
  { page, pageSize, orderBy, orderDirection }: GetAllCustomersRequest,
  enabled?: boolean
): UseQueryResult<GetCustomersResponse, Error> => {
  return useQuery({
    queryKey: [
      GET_ALL_CUSTOMERS,
      page,
      pageSize,
      ...(orderBy && orderDirection ? [orderBy, orderDirection] : []),
    ],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetCustomersResponse>({
        path: CUSTOMER_API.GET_ALL_CUSTOMERS,
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

export default useGetAllCustomers;
