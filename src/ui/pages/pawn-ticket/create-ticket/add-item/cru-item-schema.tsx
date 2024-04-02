import * as yup from "yup";
import {
  MAXIMUM_PRICE_VALUE,
  MAXIMUM_QUANTITATIVE_VALUE,
} from "../../../../../constants/generic-constants";

const cruItemSchema = yup.object({
  description: yup.string().required("Please enter a item description"),
  caratage: yup
    .number()
    .positive("Number must be positive")
    .max(
      MAXIMUM_QUANTITATIVE_VALUE,
      `Number must be less than or equal to ${MAXIMUM_QUANTITATIVE_VALUE}`
    )
    .required("Please enter the caratage")
    .typeError("Please enter a number value"),
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
  weight: yup
    .number()
    .positive("Number must be positive")
    .max(
      MAXIMUM_QUANTITATIVE_VALUE,
      `Number must be less than or equal to ${MAXIMUM_QUANTITATIVE_VALUE}`
    )
    .required("Please enter the weight.")
    .typeError("Please enter a number value"),
});

export default cruItemSchema;
