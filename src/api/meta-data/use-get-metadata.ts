import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { METADATA_API } from "../../constants/api-endpoints";
import { GET_METADATA } from "../../constants/query-leys";
import { MetaDataEnum } from "../../constants/string-constants";
import { apiService } from "../api-service";

export interface GetMetaDataRequest {
  type: MetaDataEnum;
}

const useMetaData = <T>(
  data: GetMetaDataRequest,
  enabled?: boolean
): UseQueryResult<T, Error> => {
  return useQuery({
    queryKey: [GET_METADATA, data.type],
    queryFn: ({ signal }) =>
      apiService.getRequest<T>({
        path: METADATA_API.GET_METADATA(data.type),
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useMetaData;
