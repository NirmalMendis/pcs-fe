import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { BRANCH_API } from "../../constants/api-endpoints";
import { GET_ALL_BRANCHES } from "../../constants/query-leys";
import Branch from "../../shared/types/branch";
import { apiService } from "../api-service";

export type GetAllBranchesResponse = Array<Branch>;

const useGetAllBranches = (
  enabled?: boolean
): UseQueryResult<GetAllBranchesResponse, Error> => {
  return useQuery({
    queryKey: [GET_ALL_BRANCHES],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetAllBranchesResponse>({
        path: BRANCH_API.GET_ALL_BRANCHES,
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetAllBranches;
