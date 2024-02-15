import { Divider, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { UseFormReset } from "react-hook-form";
import usePostCreateCustomer from "../../../../api/customer/use-post-create-customer";
import Backdrop from "../../../../shared/components/backdrop";
import ModalDrawer from "../../../../shared/components/modal-drawer";
import CRUCustomerForm, {
  CreateCustomerFormValues,
} from "../../customer/cru-customer-form";
import SearchCustomer from "../../customer/search-customer";
import { CreateTicketContext } from "./create-ticket";

export interface SearchRegisterCustomerModalProps {
  openCustomerModal: boolean;
  setOpenCustomerModal: Dispatch<SetStateAction<boolean>>;
  setCustomerId: (customerId: number) => void;
}

const SearchRegisterCustomerModal: FC<SearchRegisterCustomerModalProps> = ({
  openCustomerModal,
  setOpenCustomerModal,
  setCustomerId,
}) => {
  const {
    mutate: mutatePostCreateCustomer,
    isPending: isPendingPostCreateCustomer,
  } = usePostCreateCustomer();
  const { enqueueSnackbar } = useSnackbar();

  const { setCreatePawnTicketFormData } = useContext(CreateTicketContext);

  const handleSelectCustomer = (customerId: number, name: string) => {
    setCreatePawnTicketFormData((prev) => ({
      ...prev,
      customerId: customerId,
      customerName: name,
    }));
    setCustomerId(customerId);
    setOpenCustomerModal(false);
  };

  const handleRegisterCustomer = (
    data: CreateCustomerFormValues,
    reset: UseFormReset<CreateCustomerFormValues>
  ) => {
    mutatePostCreateCustomer(
      {
        payload: data,
      },
      {
        onSuccess(data) {
          enqueueSnackbar(`Customer ${data.name} has been registered.`, {
            variant: "success",
          });
          reset();
          handleSelectCustomer(data.id, data.name);
          setOpenCustomerModal(false);
        },
      }
    );
  };

  return (
    <ModalDrawer
      open={openCustomerModal}
      handleModalClose={setOpenCustomerModal}
      anchor="right"
      PaperProps={{ sx: { width: { xs: "100%", md: "75%", lg: "50%" } } }}
    >
      <Stack sx={{ p: 2 }} spacing={3}>
        <SearchCustomer handleSelectCustomer={handleSelectCustomer} />
        <Divider />
        <Stack spacing={2}>
          <Typography variant="h6" textAlign={"center"}>
            New Customer ? Register Customer
          </Typography>
          <CRUCustomerForm onSubmit={handleRegisterCustomer} />
        </Stack>
      </Stack>
      <Backdrop open={isPendingPostCreateCustomer} />
    </ModalDrawer>
  );
};

export default SearchRegisterCustomerModal;
