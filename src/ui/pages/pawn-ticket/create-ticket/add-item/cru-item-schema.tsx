import * as yup from "yup";
import {
  MAXIMUM_PRICE_VALUE,
  MAXIMUM_QUANTITATIVE_VALUE,
} from "../../../../../constants/generic-constants";
import { ItemTypes } from "../../../../../shared/types/generic";

const cruItemSchema = yup.object({
  description: yup.string().required("Please enter a item description"),
  appraisedValue: yup
    .number()
    .positive("Number must be positive")
    .max(
      MAXIMUM_PRICE_VALUE,
      `Number must be less than or equal to ${MAXIMUM_PRICE_VALUE}`
    )
    .required("Please enter the appraised value.")
    .typeError("Please enter a number value"),
  pawningAmount: yup
    .number()
    .positive("Number must be positive")
    .max(
      MAXIMUM_PRICE_VALUE,
      `Number must be less than or equal to ${MAXIMUM_PRICE_VALUE}`
    )
    .required("Please enter the pawning amount.")
    .typeError("Please enter a number value"),
  itemType: yup.string().required("Please select a value"),
  caratage: yup.number().when("itemType", ([itemType]) => {
    return itemType === ItemTypes.GOLD
      ? yup
          .number()
          .positive("Number must be positive")
          .max(
            MAXIMUM_QUANTITATIVE_VALUE,
            `Number must be less than or equal to ${MAXIMUM_QUANTITATIVE_VALUE}`
          )
          .required("Please enter the caratage")
          .typeError("Please enter a number value")
      : yup.number().notRequired().nullable();
  }),
  weight: yup.number().when("itemType", ([itemType]) => {
    return itemType === ItemTypes.GOLD
      ? yup
          .number()
          .positive("Number must be positive")
          .max(
            MAXIMUM_QUANTITATIVE_VALUE,
            `Number must be less than or equal to ${MAXIMUM_QUANTITATIVE_VALUE}`
          )
          .required("Please enter the caratage")
          .typeError("Please enter a number value")
      : yup.number().notRequired().nullable();
  }),
  vehicleNo: yup.string().when("itemType", ([itemType]) => {
    return itemType === ItemTypes.VEHICLE
      ? yup.string().required("Please vehicle number")
      : yup.string().notRequired().nullable();
  }),
});

export default cruItemSchema;
