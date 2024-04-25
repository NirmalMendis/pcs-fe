import { Box, Button, Stack, Typography } from "@mui/material";
import {
  QueryObserverResult,
  RefetchOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { FC } from "react";
import useGetCustomerById from "../../../../../api/customer/use-get-customer-by-id";
import useGetItemsByPawnTicketId from "../../../../../api/item/use-get-items-by-ticketId";
import { GetPawnTicketByIdResponse } from "../../../../../api/pawn-ticket/use-get-pawn-ticket-by-id";
import usePatchUpdatePawnTicketGeneral from "../../../../../api/pawn-ticket/use-patch-update-pawn-ticket-general";
import { GET_PAWN_TICKET_BY_ID } from "../../../../../constants/query-leys";
import Backdrop from "../../../../../shared/components/backdrop";
import getCustomerLabel from "../../../../../shared/helper/get-customer-label";
import getPeriodInMonths from "../../../../../shared/helper/getPeriodInMonths";
import { TimePeriod } from "../../../../../shared/types/generic";
import { Item } from "../../../../../shared/types/item";
import { PawnTicket } from "../../../../../shared/types/pawn-ticket";
import CreatePawnTicketForm, {
  CreatePawnTicketFormValues,
} from "../../create-ticket/create-pawn-ticket-form";

export interface UpdateGeneral {
  id: number;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<PawnTicket, Error>>;
}
const UpdateGeneral: FC<UpdateGeneral> = ({ id, refetch }) => {
  const queryClient = useQueryClient();
  const pawnTicketData = queryClient.getQueryData<GetPawnTicketByIdResponse>([
    GET_PAWN_TICKET_BY_ID,
    id,
  ]);

  const { enqueueSnackbar } = useSnackbar();

  const { data: customerData, isFetching: isFetchingCustomerData } =
    useGetCustomerById(
      {
        id: pawnTicketData?.customerId as number,
      },
      pawnTicketData?.customerId !== undefined
    );

  const { data: items, isFetching: isFetchingGetItemsByPawnTicketId } =
    useGetItemsByPawnTicketId<Array<Item>>({
      id: id,
    });

  const {
    mutate: mutateUpdatePawnTicketGeneralDetails,
    isPending: isPendingMutateUpdateGeneral,
  } = usePatchUpdatePawnTicketGeneral();

  const onSubmit = (data: CreatePawnTicketFormValues) => {
    mutateUpdatePawnTicketGeneralDetails(
      {
        payload: {
          id: id,
          serviceCharge: data.serviceCharge || undefined,
          periodInMonths: getPeriodInMonths(
            data.periodType as TimePeriod,
            data.periodQuantity
          ),
          customerId: data.customerId,
          interestRate: data.interestRate,
          pawnDate: data.pawnDate,
        },
      },
      {
        onSuccess: (data) => {
          enqueueSnackbar(`Pawn ticket with id ${data.id} has been updated.`, {
            variant: "success",
          });
          refetch();
        },
      }
    );
  };

  const getActionButtons = (isValid: boolean) => {
    return (
      <Box sx={{ justifyContent: "end", display: "flex" }}>
        <Button type="submit" disabled={!isValid}>
          Update
        </Button>
      </Box>
    );
  };

  return (
    <Stack sx={{ p: 3, pt: 0 }} spacing={4}>
      <Typography variant="h5">Edit Pawn Ticket General Details</Typography>
      {/* Wait till all data are loaded before setting form default values */}
      {customerData?.name && pawnTicketData && items && (
        <CreatePawnTicketForm
          onSubmit={onSubmit}
          md={6}
          items={items?.map((item) => item.pawningAmount)}
          createPawnTicketFormData={{
            periodQuantity: pawnTicketData?.periodInMonths,
            periodType: TimePeriod.month,
            customerId: pawnTicketData.customerId,
            interestRate: pawnTicketData.interestRate,
            pawnDate: pawnTicketData.pawnDate,
            principalAmount: pawnTicketData.principalAmount,
            serviceCharge: pawnTicketData.serviceCharge,
          }}
          currentCustomerLabel={getCustomerLabel(
            pawnTicketData?.customerId,
            customerData?.name
          )}
          getActionButtons={getActionButtons}
        />
      )}
      <Backdrop
        open={
          isFetchingGetItemsByPawnTicketId ||
          isFetchingCustomerData ||
          isPendingMutateUpdateGeneral
        }
      />
    </Stack>
  );
};

export default UpdateGeneral;
