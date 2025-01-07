import { Box, BoxProps, Button, TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { UseFormReset } from "react-hook-form";
import { InferType } from "yup";
import { useCustomHookForm } from "../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../shared/hooks/use-single-field-error";
import cruCustomerSchema from "./cru-customer-schema";

type CRUCustomerSchemaType = typeof cruCustomerSchema;
export type CRUCustomerFormValues = InferType<CRUCustomerSchemaType>;

export interface CRUCustomerFormProps extends Omit<BoxProps, "onSubmit"> {
  onSubmit: (
    data: CRUCustomerFormValues,
    reset: UseFormReset<CRUCustomerFormValues>
  ) => void;
  handleClose?: () => void;
  defaultValues?: Partial<CRUCustomerFormValues>;
  actionTitle?: string;
}

const CRUCustomerForm: FC<CRUCustomerFormProps> = ({
  onSubmit,
  handleClose,
  defaultValues,
  actionTitle = "Register",
  ...props
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useCustomHookForm<CRUCustomerSchemaType>(cruCustomerSchema, {
    defaultValues,
  });

  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit((data) => onSubmit(data, reset))}
      {...props}
    >
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="NIC number"
            {...register("nicNo")}
            error={!!getSingleFieldError("nicNo")}
            helperText={getSingleFieldError("nicNo")?.message}
            required
          />
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="First name"
            {...register("firstName")}
            error={!!getSingleFieldError("firstName")}
            helperText={getSingleFieldError("firstName")?.message}
            required
          />
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="Last name"
            {...register("lastName")}
            error={!!getSingleFieldError("lastName")}
            helperText={getSingleFieldError("lastName")?.message}
            required
          />
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!getSingleFieldError("email")}
            helperText={getSingleFieldError("email")?.message}
          />
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="Mobile number"
            {...register("mobileNo")}
            error={!!getSingleFieldError("mobileNo")}
            helperText={getSingleFieldError("mobileNo")?.message}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+94</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="Address Line 1"
            {...register("addressLine1")}
            error={!!getSingleFieldError("addressLine1")}
            helperText={getSingleFieldError("addressLine1")?.message}
            required
          />
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="Address Line 2"
            {...register("addressLine2")}
            error={!!getSingleFieldError("addressLine2")}
            helperText={getSingleFieldError("addressLine2")?.message}
          />
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="Address Line 3"
            {...register("addressLine3")}
            error={!!getSingleFieldError("addressLine3")}
            helperText={getSingleFieldError("addressLine3")?.message}
          />
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="City"
            {...register("city")}
            error={!!getSingleFieldError("city")}
            helperText={getSingleFieldError("city")?.message}
            required
          />
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <TextField
            label="Postal code"
            {...register("postalCode")}
            error={!!getSingleFieldError("postalCode")}
            helperText={getSingleFieldError("postalCode")?.message}
          />
        </Grid>
        <Grid xs={12} display={"flex"} justifyContent={"end"} gap={1}>
          {handleClose ? <Button onClick={handleClose}>Cancel</Button> : null}
          <Button type="submit">{actionTitle}</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CRUCustomerForm;
