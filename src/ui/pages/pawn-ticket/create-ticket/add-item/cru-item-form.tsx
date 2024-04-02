import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { InferType } from "yup";
import { CURRENCY_PREFIX } from "../../../../../constants/generic-constants";
import NumberField from "../../../../../shared/components/number-field";
import { useCustomHookForm } from "../../../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../../../shared/hooks/use-single-field-error";
import cruItemSchema from "./cru-item-schema";

type CRUItemSchemaType = typeof cruItemSchema;
export type CRUItemFormValues = InferType<CRUItemSchemaType>;

export interface CRUItemFormProps {
  onSubmit: (data: CRUItemFormValues) => void;
  item?: CRUItemFormValues;
}

const CRUItemForm: FC<CRUItemFormProps> = ({ onSubmit, item }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitted, submitCount, touchedFields },
    reset,
    setValue,
    control,
  } = useCustomHookForm<CRUItemSchemaType>(cruItemSchema, {
    defaultValues: item,
  });

  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  const [allowEdit, setAllowEdit] = useState(false);
  const disableFields = !allowEdit && isSubmitted;

  const handleEditClick = () => {
    setAllowEdit(true);
  };

  const handleEditCancel = () => {
    if (item) {
      setValue("appraisedValue", item.appraisedValue);
      setValue("caratage", item.caratage);
      setValue("description", item.description);
      setValue("pawningAmount", item.pawningAmount);
      setValue("weight", item.weight);
      setAllowEdit(false);
    }
  };

  const handleIntegratedSubmit = (data: CRUItemFormValues) => {
    reset(undefined, {
      keepValues: true,
      keepSubmitCount: true,
    });
    onSubmit(data);
  };

  useEffect(() => {
    setAllowEdit(!isSubmitted);
  }, [isSubmitted]);

  return (
    <form onSubmit={handleSubmit(handleIntegratedSubmit)} noValidate>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Description"
            {...register("description")}
            error={!!getSingleFieldError("description")}
            helperText={getSingleFieldError("description")?.message}
            disabled={disableFields}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Controller
            control={control}
            name="caratage"
            render={({ field }) => {
              return (
                <NumberField
                  label="Caratage"
                  customSuffix="K"
                  required
                  error={!!getSingleFieldError("caratage")}
                  helperText={getSingleFieldError("caratage")?.message}
                  disabled={disableFields}
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Controller
            control={control}
            name="appraisedValue"
            render={({ field }) => {
              return (
                <NumberField
                  label="Appraised Value (Market value)"
                  customPrefix={CURRENCY_PREFIX}
                  required
                  error={!!getSingleFieldError("appraisedValue")}
                  helperText={getSingleFieldError("appraisedValue")?.message}
                  disabled={disableFields}
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Controller
            control={control}
            name="pawningAmount"
            render={({ field }) => {
              return (
                <NumberField
                  label="Pawning Amount"
                  customPrefix={CURRENCY_PREFIX}
                  required
                  error={!!getSingleFieldError("pawningAmount")}
                  helperText={getSingleFieldError("pawningAmount")?.message}
                  disabled={disableFields}
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Controller
            control={control}
            name="weight"
            render={({ field }) => {
              return (
                <NumberField
                  label="Weight (g)"
                  customSuffix="g"
                  required
                  error={!!getSingleFieldError("weight")}
                  helperText={getSingleFieldError("weight")?.message}
                  disabled={disableFields}
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"end"}>
          {!disableFields && (
            <Stack direction={"row"} spacing={1}>
              <Button
                type="submit"
                disabled={!isValid}
                startIcon={<SaveIcon color="secondary" />}
              >
                {submitCount > 0 ? `Save changes` : `Submit`}
              </Button>
              {submitCount > 0 && (
                <Button onClick={handleEditCancel}>Cancel</Button>
              )}
            </Stack>
          )}
          {disableFields && (
            <Button
              startIcon={<EditIcon color="secondary" />}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default CRUItemForm;
