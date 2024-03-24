import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { INVOICE_API } from "../../constants/api-endpoints";
import { GET_TICKET_INVOICE } from "../../constants/query-leys";
import { MaterialContentTypes } from "../../shared/types/generic";
import { apiService } from "../api-service";

export interface GetTicketInvoiceRequest {
  id: number;
  materialContentType: MaterialContentTypes;
}

export type InvoiceHTMLType = {
  invoiceHTML: string;
};

const useGetTicketInvoice = <T>(
  { id, materialContentType }: GetTicketInvoiceRequest,
  enabled?: boolean
): UseQueryResult<T, Error> => {
  return useQuery({
    queryKey: [GET_TICKET_INVOICE, materialContentType],
    queryFn: ({ signal }) =>
      apiService.getRequest<T>({
        path: INVOICE_API.GET_TICKET_INVOICE(id),
        signal,
        queryParams: { materialContentType },
        responseType:
          materialContentType === MaterialContentTypes.PDF ? "blob" : undefined,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetTicketInvoice;
