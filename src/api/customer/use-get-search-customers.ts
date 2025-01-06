import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { CUSTOMER_API } from "../../constants/api-endpoints";
import { GET_SEARCH_CUSTOMER } from "../../constants/query-leys";
import Customer from "../../shared/types/customer";
import { OrderPaginatedRequest } from "../../shared/types/generic";
import { PaginatedData } from "../../shared/types/paginated-data";
import { apiService } from "../api-service";

export interface GetSearchCustomerRequest
  extends Partial<OrderPaginatedRequest> {
  value: string;
}

export type GetCustomerResponse = PaginatedData<Customer>;

const useGetSearchCustomers = <T = GetCustomerResponse>(
  { value, page, pageSize, orderBy, orderDirection }: GetSearchCustomerRequest,
  enabled?: boolean
): UseQueryResult<T, Error> => {
  return useQuery({
    queryKey: [
      GET_SEARCH_CUSTOMER,
      value,
      page,
      pageSize,
      ...(orderBy && orderDirection ? [orderBy, orderDirection] : []),
    ],
    queryFn: ({ signal }) =>
      apiService.getRequest<T>({
        path: CUSTOMER_API.GET_SEARCH_CUSTOMER,
        queryParams: { value, page, pageSize, orderBy, orderDirection },
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetSearchCustomers;
