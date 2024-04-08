import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { InferType } from "yup";
import { CURRENCY_PREFIX } from "../../../../../constants/generic-constants";
import NumberField from "../../../../../shared/components/number-field";
import { useCustomHookForm } from "../../../../../shared/hooks/use-custom-form";
import useSingleFieldError from "../../../../../shared/hooks/use-single-field-error";
import {
  FeatureEnum,
  ItemDetailKey,
  ItemDetailMeta,
  ItemTypes,
} from "../../../../../shared/types/generic";
import PermissionsWrapper from "../../../iam/permissions-wrapper";
import { CreateTicketContext } from "../../all-tickets/all-pawn-tickets";
import cruItemSchema from "./cru-item-schema";

type CRUItemSchemaType = typeof cruItemSchema;
export type CRUItemFormValues = InferType<CRUItemSchemaType>;

export interface CRUItemFormProps {
  onSubmit: (data: CRUItemFormValues) => void;
  item?: CRUItemFormValues;
  uiId: number;
}

const CRUItemForm: FC<CRUItemFormProps> = ({ onSubmit, item, uiId }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitted, submitCount, touchedFields },
    resetField,
    reset,
    setValue,
    watch,
    control,
  } = useCustomHookForm<CRUItemSchemaType>(cruItemSchema, {
    defaultValues: {
      ...item,
      itemType: item?.itemType ? item.itemType : ItemTypes.GOLD,
    },
  });

  const { items } = useContext(CreateTicketContext);
  const itemType = watch("itemType");

  const { getSingleFieldError } = useSingleFieldError(touchedFields, errors);

  const [allowEdit, setAllowEdit] = useState(false);
  const disableFields = !allowEdit && isSubmitted;

  const handleEditClick = () => {
    setAllowEdit(true);
  };

  const handleEditCancel = () => {
    if (item) {
      setValue("description", item.description);
      setValue("appraisedValue", item.appraisedValue);
      setValue("pawningAmount", item.pawningAmount);
      setValue("itemType", item.itemType);
      switch (itemType) {
        case ItemTypes.GOLD:
          setValue(ItemDetailKey.CARATAGE, item[ItemDetailKey.CARATAGE]);
          setValue(ItemDetailKey.WEIGHT, item[ItemDetailKey.WEIGHT]);
          break;
        case ItemTypes.VEHICLE:
          setValue(ItemDetailKey.VEHICLE_NO, item[ItemDetailKey.VEHICLE_NO]);
          break;
        default:
      }
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

  const resetItemDetails = (itemType: ItemTypes) => {
    if (itemType !== ItemTypes.GOLD) {
      resetField(ItemDetailKey.CARATAGE);
      resetField(ItemDetailKey.WEIGHT);
    }
  };

  const getItemDetailFields = () => {
    switch (itemType) {
      case ItemTypes.GOLD:
        return [
          <Grid item xs={12} sm={3} key={"gold-weight"}>
            <Controller
              control={control}
              name={ItemDetailKey.WEIGHT}
              render={({ field }) => {
                return (
                  <NumberField
                    label={ItemDetailMeta[ItemDetailKey.WEIGHT].label}
                    customSuffix="g"
                    required
                    error={!!getSingleFieldError(ItemDetailKey.WEIGHT)}
                    helperText={
                      getSingleFieldError(ItemDetailKey.WEIGHT)?.message
                    }
                    disabled={disableFields}
                    {...field}
                  />
                );
              }}
            />
          </Grid>,
          <Grid item xs={12} sm={3} key={"gold-caratage"}>
            <Controller
              control={control}
              name={ItemDetailKey.CARATAGE}
              render={({ field }) => {
                return (
                  <NumberField
                    label={ItemDetailMeta[ItemDetailKey.CARATAGE].label}
                    customSuffix="K"
                    required
                    error={!!getSingleFieldError(ItemDetailKey.CARATAGE)}
                    helperText={
                      getSingleFieldError(ItemDetailKey.CARATAGE)?.message
                    }
                    disabled={disableFields}
                    {...field}
                  />
                );
              }}
            />
          </Grid>,
        ];
      case ItemTypes.VEHICLE:
        return [
          <Grid item xs={12} sm={3} key={"vehicle-number"}>
            <TextField
              label={ItemDetailMeta[ItemDetailKey.VEHICLE_NO].label}
              {...register(ItemDetailKey.VEHICLE_NO)}
              error={!!getSingleFieldError(ItemDetailKey.VEHICLE_NO)}
              helperText={
                getSingleFieldError(ItemDetailKey.VEHICLE_NO)?.message
              }
              disabled={disableFields}
            />
          </Grid>,
        ];
      default:
        return [];
    }
  };
  useEffect(() => {
    setAllowEdit(!isSubmitted);
  }, [isSubmitted]);

  useEffect(() => {
    //set pawning amount from instant calculator
    if (items && !isSubmitted) {
      const itemToUpdate = items.find((currItem) => currItem.uiId === uiId);
      if (itemToUpdate?.pawningAmount)
        setValue("pawningAmount", itemToUpdate?.pawningAmount);
    }
  }, [items, setValue, uiId, isSubmitted]);

  return (
    <form onSubmit={handleSubmit(handleIntegratedSubmit)} noValidate>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Description"
            {...register("description")}
            error={!!getSingleFieldError("description")}
            helperText={getSingleFieldError("description")?.message}
            disabled={disableFields}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
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
        <PermissionsWrapper feature={FeatureEnum.MULTIPLE_ITEM_TYPES}>
          <Grid item xs={12} sm={3}>
            <Controller
              control={control}
              name="itemType"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
                      {...field}
                      onChange={(event, ...props) => {
                        resetItemDetails(event.target.value as ItemTypes);
                        field.onChange(event, ...props);
                      }}
                      error={!!getSingleFieldError("itemType")}
                      required
                      slotProps={{
                        input: {
                          required: true,
                        },
                      }}
                      disabled={disableFields}
                    >
                      {Object.values(ItemTypes).map((value) => (
                        <MenuItem value={value} key={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                    {getSingleFieldError("itemType") && (
                      <FormHelperText error>
                        {getSingleFieldError("itemType")?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                );
              }}
            />
          </Grid>
        </PermissionsWrapper>
        {getItemDetailFields()}
        <Grid item xs={12} display={"flex"} justifyContent={"end"}>
          {!disableFields && (
            <Stack direction={"row"} spacing={1}>
              <Button
                type="submit"
                disabled={!isValid}
                startIcon={<SaveIcon color="secondary" />}
              >
                {submitCount > 0 || item?.description
                  ? `Save changes`
                  : `Submit`}
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
