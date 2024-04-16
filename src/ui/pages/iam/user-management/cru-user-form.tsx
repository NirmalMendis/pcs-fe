import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FC } from "react";
import { Controller, UseFormReset } from "react-hook-form";
import { InferType } from "yup";
import useGetAllBranches from "../../../../api/branch/use-get-all-branches";
import useGetAllRoles from "../../../../api/role/use-get-all-roles";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../../shared/hooks/use-single-field-error";
import Role from "../../../../shared/types/role";
import cruUserSchema from "./cru-user-schema";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type CRUUserSchemaType = typeof cruUserSchema;
export type CRUUserFormValues = InferType<CRUUserSchemaType>;

export interface CRUUserFormProps {
  onSubmit: (
    data: CRUUserFormValues,
    reset: UseFormReset<CRUUserFormValues>
  ) => void;
  openCreateUserModal: boolean;
  handleClose: () => void;
  isPendingMutation?: boolean;
}

const CRUUserForm: FC<CRUUserFormProps> = ({
  onSubmit,
  openCreateUserModal,
  handleClose,
  isPendingMutation,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
    reset,
    control,
  } = useCustomHookForm<CRUUserSchemaType>(cruUserSchema, {
    defaultValues: {
      roles: [],
      branches: [],
    },
  });

  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  const { data: allRolesData, isFetching: isFetchingAllRoles } = useGetAllRoles<
    Array<Role>
  >({});

  const { data: allBranchData, isFetching: isFetchingAllBranchData } =
    useGetAllBranches();

  return (
    <Dialog
      open={openCreateUserModal}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit((data) => onSubmit(data, reset)),
      }}
      maxWidth={"md"}
    >
      <DialogTitle>Create User</DialogTitle>
      {isPendingMutation && <LinearProgress />}
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              label="First name"
              {...register("firstName")}
              error={!!getSingleFieldError("firstName")}
              helperText={getSingleFieldError("firstName")?.message}
              required
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              label="Last name"
              {...register("lastName")}
              error={!!getSingleFieldError("lastName")}
              helperText={getSingleFieldError("lastName")?.message}
              required
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={!!getSingleFieldError("email")}
              helperText={getSingleFieldError("email")?.message}
              required
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              label="Mobile number"
              {...register("mobileNo")}
              error={!!getSingleFieldError("mobileNo")}
              helperText={getSingleFieldError("mobileNo")?.message}
              required
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Controller
              control={control}
              name="roles"
              render={({ field }) => {
                return (
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Roles</InputLabel>
                    <Select
                      label="Roles"
                      multiple
                      {...field}
                      value={field.value}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {allRolesData?.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          <Checkbox checked={field.value?.includes(role.id)} />
                          <ListItemText primary={role.title} />
                        </MenuItem>
                      ))}
                    </Select>
                    {isFetchingAllRoles && <LinearProgress />}
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Controller
              control={control}
              name="branches"
              render={({ field }) => {
                return (
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Branches</InputLabel>
                    <Select
                      label="Branches"
                      multiple
                      {...field}
                      value={field.value}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {allBranchData?.map((branch) => (
                        <MenuItem key={branch.id} value={branch.id}>
                          <Checkbox
                            checked={field.value?.includes(branch.id)}
                          />
                          <ListItemText primary={branch.title} />
                        </MenuItem>
                      ))}
                    </Select>
                    {isFetchingAllBranchData && <LinearProgress />}
                  </FormControl>
                );
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled={!isValid || isPendingMutation}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CRUUserForm;
