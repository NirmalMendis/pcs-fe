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
import { FC, useContext } from "react";
import { InferType } from "yup";
import useGetAllBranches from "../../../api/branch/use-get-all-branches";
import { useCustomHookForm } from "../../../shared/hooks/use-custom-form";
import { ActiveStepContext } from "../pawn-ticket/create-ticket/create-ticket";
import StepperBtns from "../pawn-ticket/create-ticket/stepper-btns";
import createCustomerSchema from "./create-customer-schema";

type CreateCustomerSchemaType = typeof createCustomerSchema;
type CreateCustomerFormValues = InferType<CreateCustomerSchemaType>;

export interface CreateCustomerFormProps {
  actionType: "default" | "stepper";
}

const CreateCustomerForm: FC<CreateCustomerFormProps> = ({ actionType }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useCustomHookForm<CreateCustomerSchemaType>(createCustomerSchema);

  const { data: allBranchData, isFetching: isFetchingAllBranchData } =
    useGetAllBranches();
  const { handleNext } = useContext(ActiveStepContext);

  const onSubmit = (data: CreateCustomerFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
    if (handleNext) handleNext();
  };

  const renderActions = () => {
    switch (actionType) {
      case "default":
        return (
          <Grid item xs={12} display={"flex"} justifyContent={"end"}>
            <Button type="submit">Register</Button>
          </Grid>
        );
      case "stepper":
        return (
          <Grid item xs={12} key={"stepper-action"}>
            <StepperBtns disableAction={!isValid} />
          </Grid>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="NIC number"
            {...register("nicNo")}
            error={!!errors.nicNo}
            helperText={errors.nicNo?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="First name"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Last name"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Mobile number"
            {...register("mobileNo")}
            error={!!errors.mobileNo}
            helperText={errors.mobileNo?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Branch</InputLabel>
            <Select
              label="Branch"
              {...register("branchId")}
              error={!!errors.branchId}
            >
              {allBranchData?.map((branch) => (
                <MenuItem value={branch.id} key={branch.id}>
                  {`${branch.name} - ${branch.city}`}
                </MenuItem>
              ))}
            </Select>
            {errors.branchId && (
              <FormHelperText error>{errors.branchId.message}</FormHelperText>
            )}
            {isFetchingAllBranchData && <LinearProgress />}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Address Line 1"
            {...register("addressLine1")}
            error={!!errors.addressLine1}
            helperText={errors.addressLine1?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Address Line 2"
            {...register("addressLine2")}
            error={!!errors.addressLine2}
            helperText={errors.addressLine2?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Address Line 3"
            {...register("addressLine3")}
            error={!!errors.addressLine3}
            helperText={errors.addressLine3?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="City"
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Postal code"
            {...register("postalCode")}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
          />
        </Grid>
        {renderActions()}
      </Grid>
    </form>
  );
};

export default CreateCustomerForm;
