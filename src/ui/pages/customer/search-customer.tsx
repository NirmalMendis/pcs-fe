import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import useGetSearchCustomers from "../../../api/customer/use-get-search-customers";
import { TYPING_TIMEOUT_FOR_SEARCH } from "../../../constants/generic-constants";
import ProfileAvatar from "../../../shared/components/profile-avatar";

export interface SearchCustomerProps {
  handleSelectCustomer: (customerId: number, name: string) => void;
}

const SearchCustomer: FC<SearchCustomerProps> = ({ handleSelectCustomer }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    data,
    refetch,
    isFetching: isFetchingCustomerSearchData,
  } = useGetSearchCustomers(
    {
      value: searchQuery,
    },
    false
  );

  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event?.target.value);
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

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Search Customer</Typography>
      <TextField
        label="Search by ID, name, email etc."
        onChange={handleInput}
        inputProps={{
          ref: searchInputRef,
        }}
      />
      <Box display={"flex"} justifyContent={"end"}>
        <Button
          // onClick={handleOpenGuestSearch}
          startIcon={<SearchIcon color="secondary" />}
          sx={{ pl: 2, pr: 2 }}
        >
          Search
        </Button>
      </Box>
      <List>
        {isFetchingCustomerSearchData && (
          <Stack spacing={2} sx={{ mb: 1 }}>
            <Skeleton variant="rounded" height={70} />{" "}
            <Skeleton variant="rounded" height={70} />
          </Stack>
        )}
        {!isFetchingCustomerSearchData
          ? data?.map((customer) => (
              <ListItem
                alignItems="flex-start"
                key={customer.id}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "secondary.light",
                  ":hover": { backgroundColor: "ternary.dark" },
                  pt: 0.5,
                  pb: 0.5,
                  borderRadius: "10px",
                  mb: 1,
                }}
                onClick={() => handleSelectCustomer(customer.id, customer.name)}
              >
                {!!customer.name && (
                  <ListItemAvatar>
                    <ProfileAvatar name={customer.name} size="medium" />
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={customer.name}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                  secondary={
                    <Stack>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        NIC : {customer.nicNo}
                      </Typography>
                      <Typography variant="caption">
                        {customer.email}, {customer.mobileNo}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
            ))
          : null}
      </List>
      {!isFetchingCustomerSearchData && !data?.length && searchQuery ? (
        <Typography textAlign={"center"}>No Customers found</Typography>
      ) : null}
    </Stack>
  );
};

export default SearchCustomer;
