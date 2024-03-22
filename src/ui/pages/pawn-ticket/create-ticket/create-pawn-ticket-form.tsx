import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { InferType } from "yup";
import NumberField from "../../../../shared/components/number-field";
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
  const { createPawnTicketFormData, setCreatePawnTicketFormData, items } =
    useContext(CreateTicketContext);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const { handleNext } = useContext(ActiveStepContext);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors, touchedFields },
  } = useCustomHookForm<CreatePawnTicketSchemaType>(createPawnTicketSchema, {
    defaultValues: createPawnTicketFormData,
  });
  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  const onSubmit = (data: CreatePawnTicketFormValues) => {
    if (setCreatePawnTicketFormData)
      setCreatePawnTicketFormData((prev) => ({
        ...prev,
        ...data,
      }));
    if (handleNext) handleNext();
  };

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

  const customerLabel =
    createPawnTicketFormData?.customerId !== undefined
      ? `${createPawnTicketFormData?.customerId} - ${createPawnTicketFormData?.customerName}`
      : undefined;

  useEffect(() => {
    const calculatedPrincipalAmount = items
      ?.map((item) => item.pawningAmount)
      ?.reduce((acc, curr) => acc + curr, 0);
    setValue("principalAmount", calculatedPrincipalAmount, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={12} sm={6} md={4}>
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
                        required: true,
                      },
                    }}
                    disableFuture
                    value={field.value}
                    inputRef={field.ref}
                    onChange={field.onChange}
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
                        required: true,
                      },
                    }}
                    disablePast
                    value={field.value}
                    inputRef={field.ref}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              control={control}
              name="principalAmount"
              render={({ field }) => {
                return (
                  <NumberField
                    label="Principal amount"
                    customPrefix="Rs."
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              control={control}
              name="serviceCharge"
              render={({ field }) => {
                return (
                  <NumberField
                    label="Service Charge"
                    customPrefix="Rs."
                    required
                    error={!!getSingleFieldError("serviceCharge")}
                    helperText={getSingleFieldError("serviceCharge")?.message}
                    {...field}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12}>
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
      />
    </>
  );
};

export default CreatePawnTicketForm;
