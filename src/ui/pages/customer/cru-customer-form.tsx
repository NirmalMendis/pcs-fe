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
import { FC } from "react";
import { Controller, UseFormReset } from "react-hook-form";
import { InferType } from "yup";
import useGetAllBranches from "../../../api/branch/use-get-all-branches";
import { useCustomHookForm } from "../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../shared/hooks/use-single-field-error";
import cruCustomerSchema from "./cru-customer-schema";

type CRUCustomerSchemaType = typeof cruCustomerSchema;
export type CRUCustomerFormValues = InferType<CRUCustomerSchemaType>;

export interface CRUCustomerForm {
  onSubmit: (
    data: CRUCustomerFormValues,
    reset: UseFormReset<CRUCustomerFormValues>
  ) => void;
}

const CRUCustomerForm: FC<CRUCustomerForm> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
    reset,
    control,
  } = useCustomHookForm<CRUCustomerSchemaType>(cruCustomerSchema);

  const { data: allBranchData, isFetching: isFetchingAllBranchData } =
    useGetAllBranches();

  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="NIC number"
            {...register("nicNo")}
            error={!!getSingleFieldError("nicNo")}
            helperText={getSingleFieldError("nicNo")?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="First name"
            {...register("firstName")}
            error={!!getSingleFieldError("firstName")}
            helperText={getSingleFieldError("firstName")?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Last name"
            {...register("lastName")}
            error={!!getSingleFieldError("lastName")}
            helperText={getSingleFieldError("lastName")?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!getSingleFieldError("email")}
            helperText={getSingleFieldError("email")?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Mobile number"
            {...register("mobileNo")}
            error={!!getSingleFieldError("mobileNo")}
            helperText={getSingleFieldError("mobileNo")?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="branchId"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel>Branch</InputLabel>
                  <Select
                    label="Branch"
                    {...field}
                    error={!!getSingleFieldError("branchId")}
                  >
                    {allBranchData?.map((branch) => (
                      <MenuItem value={branch.id} key={branch.id}>
                        {`${branch.name} - ${branch.city}`}
                      </MenuItem>
                    ))}
                  </Select>
                  {getSingleFieldError("branchId") && (
                    <FormHelperText error>
                      {getSingleFieldError("branchId")?.message}
                    </FormHelperText>
                  )}
                  {isFetchingAllBranchData && <LinearProgress />}
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Address Line 1"
            {...register("addressLine1")}
            error={!!getSingleFieldError("addressLine1")}
            helperText={getSingleFieldError("addressLine1")?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Address Line 2"
            {...register("addressLine2")}
            error={!!getSingleFieldError("addressLine2")}
            helperText={getSingleFieldError("addressLine2")?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Address Line 3"
            {...register("addressLine3")}
            error={!!getSingleFieldError("addressLine3")}
            helperText={getSingleFieldError("addressLine3")?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="City"
            {...register("city")}
            error={!!getSingleFieldError("city")}
            helperText={getSingleFieldError("city")?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Postal code"
            {...register("postalCode")}
            error={!!getSingleFieldError("postalCode")}
            helperText={getSingleFieldError("postalCode")?.message}
          />
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"end"}>
          <Button type="submit" disabled={!isValid}>
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CRUCustomerForm;
