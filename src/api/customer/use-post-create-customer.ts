import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { CUSTOMER_API } from "../../constants/api-endpoints";
import { POST_CREATE_CUSTOMER } from "../../constants/query-leys";
import Customer from "../../shared/types/customer";
import { apiService } from "../api-service";

export type PostCreateCustomerRequest = Pick<
  Customer,
  | "email"
  | "firstName"
  | "lastName"
  | "nicNo"
  | "mobileNo"
  | "addressLine1"
  | "addressLine2"
  | "addressLine3"
  | "city"
  | "postalCode"
>;

export type PostCreateCustomerResponse = Customer;

const usePostCreateCustomer = (): UseMutationResult<
  PostCreateCustomerResponse,
  Error,
  { payload: PostCreateCustomerRequest }
> => {
  return useMutation({
    mutationKey: [POST_CREATE_CUSTOMER],
    mutationFn: ({ payload }) =>
      apiService.postRequest<PostCreateCustomerResponse>({
        path: CUSTOMER_API.POST_CREATE_CUSTOMER,
        body: payload,
      }),
  });
};

export default usePostCreateCustomer;
