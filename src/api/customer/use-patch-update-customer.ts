import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { CUSTOMER_API } from "../../constants/api-endpoints";
import { PATCH_UPDATE_CUSTOMER } from "../../constants/query-leys";
import Customer from "../../shared/types/customer";
import { apiService } from "../api-service";

export type PatchUpdateCustomerRequest = Pick<
  Customer,
  | "id"
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

const usePatchUpdateCustomer = (): UseMutationResult<
  PostCreateCustomerResponse,
  Error,
  { payload: PatchUpdateCustomerRequest }
> => {
  return useMutation({
    mutationKey: [PATCH_UPDATE_CUSTOMER],
    mutationFn: ({ payload: { id, ...body } }) =>
      apiService.patchRequest<PostCreateCustomerResponse>({
        path: CUSTOMER_API.PATCH_CUSTOMER(id),
        body,
      }),
  });
};

export default usePatchUpdateCustomer;
