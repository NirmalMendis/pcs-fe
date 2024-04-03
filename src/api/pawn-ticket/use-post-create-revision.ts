import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { PAWN_TICKET_API } from "../../constants/api-endpoints";
import { POST_CREATE_REVISION } from "../../constants/query-leys";
import { PawnTicket } from "../../shared/types/pawn-ticket";
import { apiService } from "../api-service";

export type PostCreateRevisionRequest = Pick<PawnTicket, "id">;

export type PostCreatRevisionResponse = PawnTicket;

const usePostCreateRevision = (): UseMutationResult<
  PostCreatRevisionResponse,
  Error,
  { payload: PostCreateRevisionRequest }
> => {
  return useMutation({
    mutationKey: [POST_CREATE_REVISION],
    mutationFn: ({ payload }) =>
      apiService.postRequest<PostCreatRevisionResponse>({
        path: PAWN_TICKET_API.POST_CREATE_REVISION(payload.id),
        body: payload,
      }),
  });
};

export default usePostCreateRevision;
