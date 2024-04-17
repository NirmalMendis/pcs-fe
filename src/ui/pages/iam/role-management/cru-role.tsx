import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InferType } from "yup";
import useGetAllFunctions from "../../../../api/function/use-get-all-functions";
import usePostCreateRole, {
  PostCreateRoleRequest,
} from "../../../../api/role/use-post-create-role";
import { PERMISSION_ACTIONS } from "../../../../constants/iam-constants";
import ROUTE_PATHS from "../../../../constants/route-paths";
import Backdrop from "../../../../shared/components/backdrop";
import GenericTable, {
  TableColumn,
} from "../../../../shared/components/generic-table";
import PageTitleCard from "../../../../shared/components/page-title-card";
import { useCustomHookForm } from "../../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../../shared/hooks/use-single-field-error";
import FunctionType from "../../../../shared/types/function";
import { RoleStatuses } from "../../../../shared/types/generic";
import cruRoleSchema from "./cru-role-schema";

const columns: TableColumn[] = [
  { header: "Description", accessor: "description", align: "left" },
  { header: "View", accessor: "view", align: "center" },
  { header: "Create", accessor: "create", align: "center" },
  { header: "Update", accessor: "update", align: "center" },
  { header: "Delete", accessor: "delete", align: "center" },
];

type CRURoleSchemaType = typeof cruRoleSchema;
export type CRURoleFormValues = InferType<CRURoleSchemaType>;

const CRURole = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
    reset,
    setValue,
    control,
  } = useCustomHookForm<CRURoleSchemaType>(cruRoleSchema, {
    defaultValues: {
      status: RoleStatuses.ACTIVE,
    },
  });

  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);
  const navigate = useNavigate();

  const { data: allFunctionsData } = useGetAllFunctions<Array<FunctionType>>(
    {}
  );

  const { mutate: mutatePostCreateRole, isPending: isPendingPostCreateRole } =
    usePostCreateRole();
  const { enqueueSnackbar } = useSnackbar();

  const [selectionState, setSelectionState] = useState<
    Array<{
      id: number;
      view: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    }>
  >();

  const handleCheckBox = (
    id: number,
    action: PERMISSION_ACTIONS,
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setSelectionState((prev) => {
      return prev?.map((func) => {
        if (func.id === id) {
          return { ...func, [action]: checked };
        }
        return func;
      });
    });
  };

  const getFormattedItems = () => {
    const formattedItems = allFunctionsData?.map((func) => ({
      description: func.description,
      view: func.view ? (
        <Checkbox
          onChange={handleCheckBox.bind(this, func.id, PERMISSION_ACTIONS.VIEW)}
          checked={
            !!selectionState?.find(
              (selectetionFunc) => selectetionFunc.id === func.id
            )?.view
          }
        />
      ) : null,
      create: func.create ? (
        <Checkbox
          onChange={handleCheckBox.bind(
            this,
            func.id,
            PERMISSION_ACTIONS.CREATE
          )}
          checked={
            !!selectionState?.find(
              (selectetionFunc) => selectetionFunc.id === func.id
            )?.create
          }
        />
      ) : null,
      update: func.update ? (
        <Checkbox
          onChange={handleCheckBox.bind(
            this,
            func.id,
            PERMISSION_ACTIONS.UPDATE
          )}
          checked={
            !!selectionState?.find(
              (selectetionFunc) => selectetionFunc.id === func.id
            )?.update
          }
        />
      ) : null,
      delete: func.delete ? (
        <Checkbox
          onChange={handleCheckBox.bind(
            this,
            func.id,
            PERMISSION_ACTIONS.DELETE
          )}
          checked={
            !!selectionState?.find(
              (selectetionFunc) => selectetionFunc.id === func.id
            )?.delete
          }
        />
      ) : null,
    }));
    return formattedItems;
  };

  const onSubmit = (data: CRURoleFormValues) => {
    mutatePostCreateRole(
      {
        payload: {
          ...data,
          functions: data.functions as PostCreateRoleRequest["functions"],
        },
      },
      {
        onSuccess: (data) => {
          reset();
          setSelectionState([]);
          enqueueSnackbar(`Role ${data.title} has been created.`, {
            variant: "success",
          });
        },
      }
    );
  };

  useEffect(() => {
    setSelectionState(
      allFunctionsData?.map((func) => ({
        id: func.id,
        view: false,
        create: false,
        update: false,
        delete: false,
      }))
    );
  }, [allFunctionsData]);

  useEffect(() => {
    const functionsArray: Array<object> = [];
    selectionState?.map((func) => {
      if (func.view)
        functionsArray.push({
          id: func.id,
          action: PERMISSION_ACTIONS.VIEW,
        });
      if (func.create)
        functionsArray.push({
          id: func.id,
          action: PERMISSION_ACTIONS.CREATE,
        });
      if (func.update)
        functionsArray.push({
          id: func.id,
          action: PERMISSION_ACTIONS.UPDATE,
        });
      if (func.delete)
        functionsArray.push({
          id: func.id,
          action: PERMISSION_ACTIONS.DELETE,
        });
    });

    setValue("functions", functionsArray, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [selectionState, setValue]);

  return (
    <Stack spacing={1.5} sx={{ p: 1 }}>
      <PageTitleCard>
        <Stack direction="row" alignItems={"center"}>
          <IconButton
            aria-label="delete"
            onClick={() =>
              navigate(
                `/${ROUTE_PATHS.IAM.BASE}/${ROUTE_PATHS.IAM.ROLE_MANAGEMENT}`
              )
            }
          >
            <ArrowCircleLeftIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5">Create Role</Typography>
        </Stack>
      </PageTitleCard>
      <Box
        justifyContent={{ xs: "center", sm: "end" }}
        sx={{ mt: 1, ml: "auto" }}
        display={"flex"}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          width={{
            xs: "100%",
            sm: "auto",
          }}
          justifyContent={"end"}
          alignItems={"start"}
          component={"form"}
          spacing={2}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            label="Title"
            {...register("title")}
            error={!!getSingleFieldError("title")}
            helperText={getSingleFieldError("title")?.message}
            sx={{ minWidth: "150px" }}
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    label="Status"
                    {...field}
                    error={!!getSingleFieldError("status")}
                    required
                    slotProps={{
                      input: {
                        required: true,
                      },
                    }}
                    sx={{ minWidth: "150px" }}
                  >
                    <MenuItem value={RoleStatuses.ACTIVE}>
                      {RoleStatuses.ACTIVE}
                    </MenuItem>
                    <MenuItem value={RoleStatuses.INACTIVE}>
                      {RoleStatuses.INACTIVE}
                    </MenuItem>
                  </Select>
                  {getSingleFieldError("status") && (
                    <FormHelperText error>
                      {getSingleFieldError("status")?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              );
            }}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
            sx={{ height: "100%" }}
          >
            <Button type="submit" disabled={!isValid}>
              Save
            </Button>
          </Box>
        </Stack>
      </Box>
      <GenericTable columns={columns} data={getFormattedItems() || []} />
      <Backdrop open={isPendingPostCreateRole} />
    </Stack>
  );
};

export default CRURole;
