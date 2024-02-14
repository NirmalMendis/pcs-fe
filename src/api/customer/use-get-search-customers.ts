import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { CUSTOMER_API } from "../../constants/api-endpoints";
import { GET_SEARCH_CUSTOMER } from "../../constants/query-leys";
import Customer from "../../shared/types/customer";
import { apiService } from "../api-service";

export interface GetSearchCustomerRequest {
  value: string;
}

export type GetCustomerResponse = Customer;

const useGetSearchCustomers = (
  { value }: GetSearchCustomerRequest,
  enabled?: boolean
): UseQueryResult<Array<GetCustomerResponse>, Error> => {
  return useQuery({
    queryKey: [GET_SEARCH_CUSTOMER, value],
    queryFn: ({ signal }) =>
      apiService.getRequest<Array<GetCustomerResponse>>({
        path: CUSTOMER_API.GET_SEARCH_CUSTOMER,
        queryParams: { value },
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetSearchCustomers;
