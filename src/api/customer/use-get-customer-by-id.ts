import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { CUSTOMER_API } from "../../constants/api-endpoints";
import { GET_CUSTOMER_BY_ID } from "../../constants/query-leys";
import Customer from "../../shared/types/customer";
import { apiService } from "../api-service";

export interface GetCustomerByIdRequest {
  id: number;
}

export type GetCustomerByIdResponse = Customer;

const useGetCustomerById = (
  { id }: GetCustomerByIdRequest,
  enabled?: boolean
): UseQueryResult<GetCustomerByIdResponse, Error> => {
  return useQuery({
    queryKey: [GET_CUSTOMER_BY_ID, id],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetCustomerByIdResponse>({
        path: CUSTOMER_API.GET_CUSTOMER_BY_ID(id),
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetCustomerById;
