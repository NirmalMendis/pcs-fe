import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { Controller } from "react-hook-form";
import { InferType } from "yup";
import useMetaData from "../../../../api/meta-data/use-get-metadata";
import { MetaDataEnum } from "../../../../constants/string-constants";
import ModalDrawer from "../../../../shared/components/modal-drawer";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import CreateCustomerForm from "../../customer/create-customer-form";
import SearchCustomer from "../../customer/search-customer";
import createPawnTicketSchema from "./create-pawn-ticket-schema";
import { ActiveStepContext } from "./create-ticket";
import StepperBtns from "./stepper-btns";

type CreatePawnTicketSchemaType = typeof createPawnTicketSchema;
type CreatePawnTicketFormValues = InferType<CreatePawnTicketSchemaType>;

// eslint-disable-next-line react/display-name
const CreatePawnTicketForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useCustomHookForm<CreatePawnTicketSchemaType>(createPawnTicketSchema);
  const { data: PawnTicketStatuses, isFetching: isFetchingPawnTicketStatuses } =
    useMetaData<Array<string>>({
      type: MetaDataEnum.PAWN_TICKETS_STATUS,
    });
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const { handleNext } = useContext(ActiveStepContext);

  const onSubmit = (data: CreatePawnTicketFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
    if (handleNext) handleNext();
  };

  const handleOpenGuestSearch = () => {
    setOpenCustomerModal(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Customer Id"
            {...register("customerId")}
            placeholder="Click search to select or add Guest"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button
                  onClick={handleOpenGuestSearch}
                  startIcon={<SearchIcon color="secondary" />}
                  sx={{ pl: 2, pr: 2 }}
                >
                  Search
                </Button>
              ),
            }}
            error={!!errors.customerId}
            helperText={errors.customerId?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            control={control}
            name="pawnDate"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <DatePicker
                  label="Pawn entry date"
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.pawnDate,
                      helperText: errors.pawnDate?.message,
                    },
                  }}
                  value={field.value}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            control={control}
            name="dueDate"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <DatePicker
                  label="Due date"
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.dueDate,
                      helperText: errors.dueDate?.message,
                    },
                  }}
                  value={field.value}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Principal amount"
            type="number"
            {...register("principalAmount")}
            error={!!errors.principalAmount}
            helperText={errors.principalAmount?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Interest rate"
            type="number"
            {...register("interestRate")}
            error={!!errors.interestRate}
            helperText={errors.interestRate?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              {...register("status")}
              error={!!errors.status}
            >
              {PawnTicketStatuses?.map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.status && (
              <FormHelperText error>{errors.status.message}</FormHelperText>
            )}
            {isFetchingPawnTicketStatuses && <LinearProgress />}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <StepperBtns disableAction={!isValid} />
        </Grid>
      </Grid>
      <ModalDrawer
        open={openCustomerModal}
        handleModalClose={setOpenCustomerModal}
        anchor="right"
        PaperProps={{ sx: { width: { xs: "100%", md: "75%", lg: "50%" } } }}
      >
        <Stack sx={{ p: 2 }} spacing={3}>
          <SearchCustomer />
          <Divider />
          <Stack spacing={2}>
            <Typography variant="h6" textAlign={"center"}>
              New Customer ? Register Customer
            </Typography>
            <CreateCustomerForm />
          </Stack>
        </Stack>
      </ModalDrawer>
    </form>
  );
};

export default CreatePawnTicketForm;
