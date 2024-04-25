import { Divider, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { Dispatch, FC, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
import usePostCreateCustomer from "../../../../api/customer/use-post-create-customer";
import { MULTIPLE_WHITESPACE_REGEX } from "../../../../constants/generic-constants";
import Backdrop from "../../../../shared/components/backdrop";
import ModalDrawer from "../../../../shared/components/modal-drawer";
import CRUCustomerForm, {
  CRUCustomerFormValues,
} from "../../customer/cru-customer-form";
import SearchCustomer from "../../customer/search-customer";

export interface SearchRegisterCustomerModalProps {
  openCustomerModal: boolean;
  setOpenCustomerModal: Dispatch<SetStateAction<boolean>>;
  handleSelectCustomer: (customerId: number, name: string) => void;
}

const SearchRegisterCustomerModal: FC<SearchRegisterCustomerModalProps> = ({
  openCustomerModal,
  setOpenCustomerModal,
  handleSelectCustomer,
}) => {
  const {
    mutate: mutatePostCreateCustomer,
    isPending: isPendingPostCreateCustomer,
  } = usePostCreateCustomer();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterCustomer = (
    data: CRUCustomerFormValues,
    reset: UseFormReset<CRUCustomerFormValues>
  ) => {
    mutatePostCreateCustomer(
      {
        payload: {
          ...data,
          firstName: data.firstName.replaceAll(MULTIPLE_WHITESPACE_REGEX, " "),
          lastName: data.lastName.replaceAll(MULTIPLE_WHITESPACE_REGEX, " "),
          email: data.email ? data.email : undefined,
          addressLine2: data.addressLine2 ? data.addressLine2 : undefined,
          addressLine3: data.addressLine3 ? data.addressLine3 : undefined,
          postalCode: data.postalCode ? data.postalCode : undefined,
        },
      },
      {
        onSuccess(data) {
          enqueueSnackbar(`Customer ${data.name} has been registered.`, {
            variant: "success",
          });
          reset();
          handleSelectCustomer(data.id, data.name);
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
