import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { PAWN_TICKET_API } from "../../constants/api-endpoints";
import { GET_REVISION_IDS } from "../../constants/query-leys";
import { apiService } from "../api-service";

export interface GetRevisionIdsRequest {
  id: number;
}

export type GetRevisionIdsResponse = Array<number>;

const useGetRevisionIds = (
  { id }: GetRevisionIdsRequest,
  enabled?: boolean
): UseQueryResult<GetRevisionIdsResponse, Error> => {
  return useQuery({
    queryKey: [GET_REVISION_IDS, id],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetRevisionIdsResponse>({
        path: PAWN_TICKET_API.GET_REVISION_IDS(id),
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetRevisionIds;
