import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import { FC } from "react";
import { UseFormReset } from "react-hook-form";
import CRUCustomerForm, { CRUCustomerFormValues } from "../cru-customer-form";

export interface CreateCustomerProps {
  onSubmit: (
    data: CRUCustomerFormValues,
    reset: UseFormReset<CRUCustomerFormValues>
  ) => void;
  openCreateCustomerModal: boolean;
  handleClose: () => void;
  isPendingMutation?: boolean;
}

const CreateCustomer: FC<CreateCustomerProps> = ({
  onSubmit,
  openCreateCustomerModal,
  handleClose,
  isPendingMutation,
}) => {
  return (
    <Dialog
      open={openCreateCustomerModal}
      onClose={handleClose}
      maxWidth={"md"}
    >
      <DialogTitle>Create Customer</DialogTitle>
      {isPendingMutation && <LinearProgress />}
      <DialogContent>
        <CRUCustomerForm onSubmit={onSubmit} sx={{ mt: 1 }} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomer;
