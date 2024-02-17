import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { Controller } from "react-hook-form";
import { InferType } from "yup";
import useMetaData from "../../../../api/meta-data/use-get-metadata";
import { MetaDataEnum } from "../../../../constants/string-constants";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../../shared/hooks/use-single-field-error";
import createPawnTicketSchema from "./create-pawn-ticket-schema";
import { ActiveStepContext, CreateTicketContext } from "./create-ticket";
import SearchRegisterCustomerModal from "./search-register-customer-modal";
import StepperBtns from "./stepper-btns";

type CreatePawnTicketSchemaType = typeof createPawnTicketSchema;
export type CreatePawnTicketFormValues = InferType<CreatePawnTicketSchemaType>;

// eslint-disable-next-line react/display-name
const CreatePawnTicketForm = () => {
  const { createPawnTicketFormData, setCreatePawnTicketFormData } =
    useContext(CreateTicketContext);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const { handleNext } = useContext(ActiveStepContext);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors, touchedFields },
  } = useCustomHookForm<CreatePawnTicketSchemaType>(createPawnTicketSchema, {
    defaultValues: createPawnTicketFormData,
  });
  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  const { data: PawnTicketStatuses, isFetching: isFetchingPawnTicketStatuses } =
    useMetaData<Array<string>>({
      type: MetaDataEnum.PAWN_TICKETS_STATUS,
    });

  const onSubmit = (data: CreatePawnTicketFormValues) => {
    if (setCreatePawnTicketFormData) setCreatePawnTicketFormData(data);
    if (handleNext) handleNext();
  };

  const handleOpenGuestSearch = () => {
    setOpenCustomerModal(true);
  };

  const setCustomerId = (customerId: number) => {
    setValue("customerId", customerId, {
      shouldDirty: true,
    });
  };

  const customerLabel =
    createPawnTicketFormData?.customerId !== undefined
      ? `${createPawnTicketFormData?.customerId} - ${createPawnTicketFormData?.customerName}`
      : undefined;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Customer"
              placeholder="Customer"
              value={customerLabel}
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
              error={!!getSingleFieldError("customerId")}
              helperText={
                getSingleFieldError("customerId")?.message ||
                "Click search to select or register customer"
              }
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
                        error: !!getSingleFieldError("pawnDate"),
                        helperText: getSingleFieldError("pawnDate")?.message,
                      },
                    }}
                    disableFuture
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
                        error: !!getSingleFieldError("dueDate"),
                        helperText: getSingleFieldError("dueDate")?.message,
                      },
                    }}
                    disablePast
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
              error={!!getSingleFieldError("principalAmount")}
              helperText={getSingleFieldError("principalAmount")?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Interest rate"
              type="number"
              {...register("interestRate")}
              error={!!getSingleFieldError("interestRate")}
              helperText={getSingleFieldError("interestRate")?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                {...register("status")}
                error={!!getSingleFieldError("status")}
              >
                {PawnTicketStatuses?.map((type) => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {getSingleFieldError("status") && (
                <FormHelperText error>
                  {getSingleFieldError("status")?.message}
                </FormHelperText>
              )}
              {isFetchingPawnTicketStatuses && <LinearProgress />}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <StepperBtns disableAction={!isValid} type="submit" />
          </Grid>
        </Grid>
      </form>
      <SearchRegisterCustomerModal
        openCustomerModal={openCustomerModal}
        setOpenCustomerModal={setOpenCustomerModal}
        setCustomerId={setCustomerId}
      />
    </>
  );
};

export default CreatePawnTicketForm;
