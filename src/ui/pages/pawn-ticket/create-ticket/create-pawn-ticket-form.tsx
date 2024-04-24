import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { DatePicker } from "@mui/x-date-pickers";
import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { InferType } from "yup";
import {
  CURRENCY_PREFIX,
  DD_MM_YYY_FORMAT,
} from "../../../../constants/generic-constants";
import NumberField from "../../../../shared/components/number-field";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../../shared/hooks/use-single-field-error";
import { TimePeriod } from "../../../../shared/types/generic";
import { TicketFormData } from "../all-tickets/all-pawn-tickets";
import createPawnTicketSchema from "./create-pawn-ticket-schema";
import SearchRegisterCustomerModal from "./search-register-customer-modal";
import StepperBtns from "./stepper-btns";

type CreatePawnTicketSchemaType = typeof createPawnTicketSchema;
export type CreatePawnTicketFormValues = InferType<CreatePawnTicketSchemaType>;

export interface CreatePawnTicketFormProps {
  items?: Array<number>;
  createPawnTicketFormData?: Partial<TicketFormData>;
  onSubmit: (data: CreatePawnTicketFormValues) => void;
}
// eslint-disable-next-line react/display-name
const CreatePawnTicketForm: FC<CreatePawnTicketFormProps> = ({
  items,
  onSubmit,
  createPawnTicketFormData,
}) => {
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [customerLabel, setCustomerLabel] = useState<string>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors, touchedFields },
  } = useCustomHookForm<CreatePawnTicketSchemaType>(createPawnTicketSchema, {
    defaultValues: createPawnTicketFormData,
  });
  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  const handleOpenGuestSearch = () => {
    setOpenCustomerModal(true);
  };

  const setCustomerId = (customerId: number) => {
    setValue("customerId", customerId, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    const calculatedPrincipalAmount = items?.reduce(
      (acc, curr) => acc + curr,
      0
    );
    setValue("principalAmount", calculatedPrincipalAmount, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [items, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              label="Customer"
              placeholder="Customer"
              required
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
          <Grid xs={12} sm={6} md={4}>
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
                        required: true,
                      },
                    }}
                    disableFuture
                    value={field.value}
                    inputRef={field.ref}
                    onChange={field.onChange}
                    format={DD_MM_YYY_FORMAT}
                  />
                );
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Controller
              control={control}
              name="periodType"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel>Period Type</InputLabel>
                    <Select
                      label="Period Type"
                      {...field}
                      error={!!getSingleFieldError("periodType")}
                      required
                      slotProps={{
                        input: {
                          required: true,
                        },
                      }}
                    >
                      <MenuItem value={TimePeriod.month}>Month</MenuItem>
                      <MenuItem value={TimePeriod.year}>Year</MenuItem>
                    </Select>
                    {getSingleFieldError("periodType") && (
                      <FormHelperText error>
                        {getSingleFieldError("periodType")?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Controller
              control={control}
              name="periodQuantity"
              render={({ field }) => {
                return (
                  <NumberField
                    label="Period"
                    error={!!getSingleFieldError("periodQuantity")}
                    helperText={getSingleFieldError("periodQuantity")?.message}
                    {...field}
                  />
                );
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Controller
              control={control}
              name="principalAmount"
              render={({ field }) => {
                return (
                  <NumberField
                    label="Principal amount"
                    customPrefix={CURRENCY_PREFIX}
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Controller
              control={control}
              name="serviceCharge"
              render={({ field }) => {
                return (
                  <NumberField
                    label="Service Charge"
                    customPrefix={CURRENCY_PREFIX}
                    error={!!getSingleFieldError("serviceCharge")}
                    helperText={getSingleFieldError("serviceCharge")?.message}
                    {...field}
                  />
                );
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Controller
              control={control}
              name="interestRate"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <NumberField
                    label="Interest rate (%)"
                    customSuffix="%"
                    required
                    error={!!getSingleFieldError("interestRate")}
                    helperText={getSingleFieldError("interestRate")?.message}
                    {...field}
                  />
                );
              }}
            />
          </Grid>
          <Grid xs={12}>
            <StepperBtns
              actionButtonProps={{
                disabled: !isValid,
                type: "submit",
              }}
            />
          </Grid>
        </Grid>
      </form>
      {/* Keep this Modal out of the form to prevent above form submission when inner form submits */}
      <SearchRegisterCustomerModal
        openCustomerModal={openCustomerModal}
        setOpenCustomerModal={setOpenCustomerModal}
        setCustomerId={setCustomerId}
        setCustomerLabel={setCustomerLabel}
      />
    </>
  );
};

export default CreatePawnTicketForm;
