import { Button, Stack, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";
import useGetAllCustomers from "../../../../api/customer/use-get-all-customers";
import useGetSearchCustomers from "../../../../api/customer/use-get-search-customers";
import usePostCreateCustomer from "../../../../api/customer/use-post-create-customer";
import {
  DEFAULT_PAGE_SIZE,
  MULTIPLE_WHITESPACE_REGEX,
  TYPING_TIMEOUT_FOR_SEARCH,
} from "../../../../constants/generic-constants";
import PageTitleCard from "../../../../shared/components/page-title-card";
import SearchInput from "../../../../shared/components/search-input";
import { OrderDirection } from "../../../../shared/types/generic";
import CreateCustomer from "../create-customer/create-customer";
import { CRUCustomerFormValues } from "../cru-customer-form";
import AllCustomersTable from "./all-customers-table";

const AllCustomers = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [openCreateCustomerModal, setOpenCreateCustomerModal] = useState(false);

  const {
    mutate: mutatePostCreateCustomer,
    isPending: isPendingPostCreateCustomer,
  } = usePostCreateCustomer();
  const { enqueueSnackbar } = useSnackbar();

  const {
    data,
    isFetching: isFetchingUsers,
    refetch: refetchAllCustomers,
  } = useGetAllCustomers({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    orderBy: "createdAt",
    orderDirection: OrderDirection.DESC,
  });

  const {
    data: searchData,
    refetch,
    isFetching: isFetchingCustomerSearchData,
  } = useGetSearchCustomers(
    {
      value: searchQuery,
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      orderBy: "createdAt",
      orderDirection: OrderDirection.DESC,
    },
    false
  );

  const dataToDisplay = {
    customers: searchQuery ? searchData?.pageData : data?.pageData,
    totalItems: searchQuery
      ? searchData?.pager.totalItems
      : data?.pager.totalItems,
    isFetching: searchQuery ? isFetchingCustomerSearchData : isFetchingUsers,
  };

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
          setOpenCreateCustomerModal(false);
          refetchAllCustomers();
        },
      }
    );
  };

  const onChangeSearch = (
    event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event?.target.value || "");
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  };

  const handleOpenCloseCreateCustomerModal = () => {
    setOpenCreateCustomerModal((prev) => !prev);
  };

  useEffect(() => {
    const debouncedApiCall = debounce(() => {
      refetch();
    }, TYPING_TIMEOUT_FOR_SEARCH);

    if (searchQuery) debouncedApiCall();

    return () => {
      debouncedApiCall.cancel();
    };
  }, [searchQuery, refetch]);

  return (
    <Stack spacing={1.5} sx={{ p: 1 }}>
      <PageTitleCard>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "start", sm: "center" }}
          justifyContent={"space-between"}
          spacing={1}
        >
          <Typography variant="h5">Customers</Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            width={"100%"}
            justifyContent={"end"}
            spacing={1}
          >
            <Button onClick={handleOpenCloseCreateCustomerModal}>
              Create Customer
            </Button>
            <SearchInput
              onChange={onChangeSearch}
              placeholder="Search customer..."
            />
          </Stack>
        </Stack>
      </PageTitleCard>
      <AllCustomersTable
        customers={dataToDisplay.customers}
        totalItems={dataToDisplay.totalItems}
        isFetching={dataToDisplay.isFetching}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
      <CreateCustomer
        openCreateCustomerModal={openCreateCustomerModal}
        onSubmit={handleRegisterCustomer}
        handleClose={handleOpenCloseCreateCustomerModal}
        isPendingMutation={isPendingPostCreateCustomer}
      />
    </Stack>
  );
};

export default AllCustomers;
