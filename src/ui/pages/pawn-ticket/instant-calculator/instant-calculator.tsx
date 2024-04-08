import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CalculateIcon from "@mui/icons-material/Calculate";
import DeleteIcon from "@mui/icons-material/Delete";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { addMonths, format } from "date-fns";
import { debounce } from "lodash";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { InferType } from "yup";
import useGetCalculateMonthlyInterest from "../../../../api/pawn-ticket/use-get-calculate-monthly-interest";
import {
  CURRENCY_PREFIX,
  DD_MM_YYY_FORMAT,
  TYPING_TIMEOUT_FOR_SEARCH,
} from "../../../../constants/generic-constants";
import ModalDrawer from "../../../../shared/components/modal-drawer";
import NumberField from "../../../../shared/components/number-field";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../../shared/hooks/use-single-field-error";
import useTextFormatter from "../../../../shared/hooks/use-text-formatter";
import { TimePeriod } from "../../../../shared/types/generic";
import { CreateTicketContext } from "../all-tickets/all-pawn-tickets";
import instantCalculatorSchema from "./instant-calculator-schema";

type InstantcalculatorSchemaType = typeof instantCalculatorSchema;
export type InstantCalculatorFormValues =
  InferType<InstantcalculatorSchemaType>;

export interface InstantCalculatorProps {
  setShowCreateTicket: Dispatch<SetStateAction<boolean>>;
}
const InstantCalculator: FC<InstantCalculatorProps> = ({
  setShowCreateTicket,
}) => {
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const newItemRef = useRef<HTMLDivElement>(null);
  const { formatRs } = useTextFormatter();
  const { setCreatePawnTicketFormData, setItems } =
    useContext(CreateTicketContext);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isValid, errors, touchedFields },
  } = useCustomHookForm<InstantcalculatorSchemaType>(instantCalculatorSchema, {
    defaultValues: {
      pawnDate: new Date(),
      items: [{ pawningAmount: undefined }],
      periodType: TimePeriod.month,
    },
  });

  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const startDate = watch("pawnDate");
  const periodQuantity = watch("periodQuantity");
  const periodType = watch("periodType");
  const items = watch("items");
  const principalAmount = !getSingleFieldError("items")
    ? items?.reduce((acc, cur) => (acc += Number(cur.pawningAmount) || 0), 0)
    : undefined;
  const serviceCharge = !getSingleFieldError("serviceCharge")
    ? Number(watch("serviceCharge"))
    : undefined;
  const interestRate = watch("interestRate");
  const {
    data: monthlyInterestData,
    refetch,
    isFetching: isFetchingMonthlyInterestData,
  } = useGetCalculateMonthlyInterest(
    {
      interestRate: interestRate || 0,
      principalAmount: principalAmount || 0,
    },
    false
  );

  const getDueDate = () => {
    let dueDate;
    if (periodQuantity && !getSingleFieldError("periodQuantity")) {
      if (periodType === TimePeriod.year)
        dueDate = addMonths(startDate, periodQuantity * 12);
      else if (periodType === TimePeriod.month)
        dueDate = addMonths(startDate, +periodQuantity);
    }

    return dueDate;
  };
  const dueDate = getDueDate();

  const handleShowInstantCalculator = () => {
    setOpenCustomerModal(true);
  };

  const getTotalPayable = () => {
    if (!principalAmount) return;
    return principalAmount - (serviceCharge || 0);
  };

  const onSubmit = (data: InstantCalculatorFormValues) => {
    const { items, ...ticketData } = data;
    setCreatePawnTicketFormData({
      ...ticketData,
      dueDate: getDueDate(),
    });
    if (items)
      setItems(
        items
          ?.filter((item) => item.pawningAmount !== undefined)
          ?.map((item, index) => ({
            uiId: index,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            pawningAmount: item.pawningAmount!,
            appraisedValue: 0,
            description: "",
            isSubmitted: false,
            itemType: "",
          }))
      );
    setOpenCustomerModal(false);
    setShowCreateTicket(true);
  };

  const itemErrors = getSingleFieldError("items") as Array<{
    pawningAmount?: {
      message: string;
    };
  }>;

  useEffect(() => {
    if (newItemRef.current) {
      newItemRef.current.scrollIntoView({ behavior: "smooth" });
      newItemRef.current.focus();
    }
  }, [fields]);

  useEffect(() => {
    const debouncedApiCall = debounce(() => {
      refetch();
    }, TYPING_TIMEOUT_FOR_SEARCH);

    if (interestRate <= 100 && principalAmount) debouncedApiCall();

    return () => {
      debouncedApiCall.cancel();
    };
  }, [interestRate, principalAmount, refetch]);

  useEffect(() => {
    if (principalAmount !== undefined)
      setValue("principalAmount", principalAmount);
  }, [getValues, setValue, principalAmount]);

  return (
    <Box>
      <Button
        color="primary"
        size="medium"
        onClick={handleShowInstantCalculator}
        startIcon={<CalculateIcon color="secondary" />}
      >
        Instant Calculator
      </Button>
      <ModalDrawer
        open={openCustomerModal}
        handleModalClose={setOpenCustomerModal}
        anchor="right"
        PaperProps={{
          sx: { width: { xs: "100%", sm: "70%", md: "40%", lg: "30%" } },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack sx={{ p: 2, pt: 0 }} spacing={2} divider={<Divider />}>
            <Typography variant="h6">Instant Calculator</Typography>
            <Box>
              <Stack spacing={2}>
                <Stack
                  maxHeight={"100px"}
                  sx={{
                    pt: "4px",
                    overflowY: "auto",
                  }}
                  spacing={1}
                  divider={<Divider orientation="horizontal" />}
                >
                  {fields.map((field, index) => (
                    <Grid key={field.id} container ref={newItemRef}>
                      <Grid xs={5} alignItems={"center"} display={"flex"}>
                        <Typography fontSize={14} fontWeight={"bold"}>{`Item ${
                          index + 1
                        }`}</Typography>
                      </Grid>
                      <Grid xs={7}>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          sx={{ pr: 1 }}
                          alignItems={"center"}
                        >
                          <Controller
                            control={control}
                            name={`items.${index}.pawningAmount`}
                            render={({ field }) => {
                              return (
                                <NumberField
                                  label="Pawning Amount"
                                  customPrefix={CURRENCY_PREFIX}
                                  required
                                  error={
                                    itemErrors?.length
                                      ? !!itemErrors[index]?.pawningAmount
                                      : false
                                  }
                                  helperText={
                                    itemErrors?.length
                                      ? itemErrors[index]?.pawningAmount
                                          ?.message
                                      : null
                                  }
                                  {...field}
                                />
                              );
                            }}
                          />
                          <IconButton
                            color="error"
                            onClick={() => remove(index)}
                            sx={{
                              border: "1px solid",
                              borderRadius: "5px",
                            }}
                            disabled={items?.length === 1}
                          >
                            <DeleteIcon
                              color={items?.length === 1 ? "disabled" : "error"}
                              fontSize="inherit"
                            />
                          </IconButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  ))}
                </Stack>
                <Button
                  onClick={() => append({})}
                  startIcon={<AddCircleOutlineRoundedIcon color="secondary" />}
                  sx={{ pl: 2, pr: 2 }}
                >
                  Add item
                </Button>
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
                            helperText:
                              getSingleFieldError("pawnDate")?.message,
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
                <Stack direction={"row"} spacing={2}>
                  <Controller
                    control={control}
                    name="periodQuantity"
                    render={({ field }) => {
                      return (
                        <NumberField
                          label="Period"
                          error={!!getSingleFieldError("periodQuantity")}
                          helperText={
                            getSingleFieldError("periodQuantity")?.message
                          }
                          {...field}
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="periodType"
                    render={({ field }) => {
                      return (
                        <FormControl fullWidth>
                          <InputLabel>Type</InputLabel>
                          <Select
                            label="Type"
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
                </Stack>
                <Stack direction={"row"} spacing={2}>
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
                          helperText={
                            getSingleFieldError("interestRate")?.message
                          }
                          {...field}
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="serviceCharge"
                    render={({ field }) => {
                      return (
                        <NumberField
                          label="Service Charge"
                          customPrefix={CURRENCY_PREFIX}
                          error={!!getSingleFieldError("serviceCharge")}
                          helperText={
                            getSingleFieldError("serviceCharge")?.message
                          }
                          {...field}
                        />
                      );
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
            <Stack spacing={1}>
              <Typography variant="h6">Summary</Typography>
              {formatRs ? (
                <Stack spacing={1}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography fontSize={14}>Start Date</Typography>
                    <Typography fontSize={14}>
                      {format(startDate, DD_MM_YYY_FORMAT)}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography fontSize={14}>Due Date</Typography>
                    <Typography fontSize={14}>
                      {dueDate ? format(dueDate, DD_MM_YYY_FORMAT) : "-"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography fontSize={14} fontWeight={"bold"}>
                      Principal Amount
                    </Typography>
                    <Typography fontSize={14} fontWeight={"bold"}>
                      {principalAmount
                        ? formatRs(String(principalAmount))
                        : "-"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography fontSize={14} fontWeight={"bold"}>
                      Monthly Interest
                    </Typography>
                    {!isFetchingMonthlyInterestData ? (
                      <Typography fontSize={14} fontWeight={"bold"}>
                        {monthlyInterestData
                          ? formatRs(
                              String(monthlyInterestData?.monthlyInterest)
                            )
                          : "-"}
                      </Typography>
                    ) : (
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "50px" }}
                      />
                    )}
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography fontSize={14}>Service Charge</Typography>
                    <Typography fontSize={14}>
                      {serviceCharge ? formatRs(String(serviceCharge)) : "-"}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography fontSize={14} fontWeight={"bold"}>
                      Total Payable to Customer
                    </Typography>
                    <Typography fontSize={14} fontWeight={"bold"}>
                      {getTotalPayable()
                        ? formatRs(String(getTotalPayable()))
                        : "-"}
                    </Typography>
                  </Stack>
                  <Divider />
                </Stack>
              ) : null}
              <Button
                endIcon={<DoubleArrowIcon color="secondary" />}
                type="submit"
                disabled={!isValid}
              >
                Transfer to Ticket
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDrawer>
    </Box>
  );
};

export default InstantCalculator;
