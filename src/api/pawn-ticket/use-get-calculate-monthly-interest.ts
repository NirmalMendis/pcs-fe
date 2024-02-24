import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { PAWN_TICKET_API } from "../../constants/api-endpoints";
import { GET_CALCULATE_MONTHLY_INTEREST } from "../../constants/query-leys";
import { apiService } from "../api-service";

export interface GetCalculateMonthlyInterestRequest {
  principalAmount: number;
  interestRate: number;
}

export type GetCalculateMonthlyInterestResponse = {
  monthlyInterest: number;
};

const useGetCalculateMonthlyInterest = (
  { principalAmount, interestRate }: GetCalculateMonthlyInterestRequest,
  enabled?: boolean
): UseQueryResult<GetCalculateMonthlyInterestResponse, Error> => {
  return useQuery({
    queryKey: [GET_CALCULATE_MONTHLY_INTEREST],
    queryFn: ({ signal }) =>
      apiService.getRequest<GetCalculateMonthlyInterestResponse>({
        path: PAWN_TICKET_API.GET_CALCULATE_MONTHLY_INTEREST,
        queryParams: { principalAmount, interestRate },
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetCalculateMonthlyInterest;
