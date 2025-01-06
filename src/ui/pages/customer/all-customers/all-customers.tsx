import { Stack, Typography } from "@mui/material";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import useGetAllCustomers from "../../../../api/customer/use-get-all-customers";
import useGetSearchCustomers from "../../../../api/customer/use-get-search-customers";
import {
  DEFAULT_PAGE_SIZE,
  TYPING_TIMEOUT_FOR_SEARCH,
} from "../../../../constants/generic-constants";
import PageTitleCard from "../../../../shared/components/page-title-card";
import SearchInput from "../../../../shared/components/search-input";
import { OrderDirection } from "../../../../shared/types/generic";
import AllCustomersTable from "./all-customers-table";

const AllCustomers = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isFetching: isFetchingUsers } = useGetAllCustomers({
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

  const onChangeSearch = (
    event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event?.target.value || "");
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
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
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Customers</Typography>
          <SearchInput
            onChange={onChangeSearch}
            placeholder="Search customer..."
          />
        </Stack>
      </PageTitleCard>
      <AllCustomersTable
        customers={dataToDisplay.customers}
        totalItems={dataToDisplay.totalItems}
        isFetching={dataToDisplay.isFetching}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </Stack>
  );
};

export default AllCustomers;
