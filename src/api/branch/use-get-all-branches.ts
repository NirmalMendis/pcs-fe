import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { BRANCH_API } from "../../constants/api-endpoints";
import { GET_ALL_BRANCHES } from "../../constants/query-leys";
import { apiService } from "../api-service";

export interface GetAllBranchesResponse {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  postalCode: string;
  logoURL: string;
  isMainBranch: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const useGetAllBranches = (
  enabled?: boolean
): UseQueryResult<Array<GetAllBranchesResponse>, Error> => {
  return useQuery({
    queryKey: [GET_ALL_BRANCHES],
    queryFn: ({ signal }) =>
      apiService.getRequest<Array<GetAllBranchesResponse>>({
        path: BRANCH_API.GET_ALL_BRANCHES,
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetAllBranches;
