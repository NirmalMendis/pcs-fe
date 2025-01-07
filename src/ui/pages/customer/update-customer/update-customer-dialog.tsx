import { Divider, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import usePatchUpdateCustomer from "../../../../api/customer/use-patch-update-customer";
import { GET_CUSTOMER_BY_ID } from "../../../../constants/query-leys";
import ModalDrawer from "../../../../shared/components/modal-drawer";
import Customer from "../../../../shared/types/customer";
import CRUCustomerForm, { CRUCustomerFormValues } from "../cru-customer-form";

export interface UpdateCustomerDialogProps {
  openCustomerModal: boolean;
  setOpenCustomerModal: React.Dispatch<React.SetStateAction<boolean>>;
  customer: Customer;
}
const UpdateCustomerDialog: FC<UpdateCustomerDialogProps> = ({
  openCustomerModal,
  setOpenCustomerModal,
  customer,
}) => {
  const updateCustomerMutation = usePatchUpdateCustomer();
  const queryClient = useQueryClient();

  const onSubmit = (data: CRUCustomerFormValues) => {
    updateCustomerMutation.mutate(
      { payload: { id: customer.id, ...data } },
      {
        onSuccess(data) {
          enqueueSnackbar(`Customer ${data.name} has been updated.`, {
            variant: "success",
          });
          setOpenCustomerModal(false);
          queryClient.invalidateQueries({
            queryKey: [GET_CUSTOMER_BY_ID, customer.id],
          });
        },
      }
    );
  };

  return (
    <ModalDrawer
      open={openCustomerModal}
      handleModalClose={setOpenCustomerModal}
      anchor="right"
      PaperProps={{
        sx: { width: { xs: "100%", sm: "70%", md: "50%" } },
      }}
    >
      <Stack sx={{ p: 2, pt: 0 }} spacing={2} divider={<Divider />}>
        <Typography variant="h6">Update Customer Details</Typography>
        <CRUCustomerForm
          onSubmit={onSubmit}
          sx={{ mt: 1 }}
          defaultValues={customer}
          handleClose={() => setOpenCustomerModal(false)}
          actionTitle="Update"
        />
      </Stack>
    </ModalDrawer>
  );
};

export default UpdateCustomerDialog;
