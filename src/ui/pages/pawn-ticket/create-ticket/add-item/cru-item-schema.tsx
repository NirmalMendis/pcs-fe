import * as yup from "yup";

const cruItemSchema = yup.object({
  description: yup.string().required("Please enter a item description"),
  caratage: yup
    .number()
    .positive("Number must be positive")
    .required("Please enter the caratage")
    .typeError("Please enter a number value"),
  appraisedValue: yup
    .number()
    .positive("Number must be positive")
    .required("Please enter the appraised value.")
    .typeError("Please enter a number value"),
  pawningAmount: yup
    .number()
    .positive("Number must be positive")
    .required("Please enter the pawning amount.")
    .typeError("Please enter a number value"),
  weight: yup
    .number()
    .positive("Number must be positive")
    .required("Please enter the weight.")
    .typeError("Please enter a number value"),
});

export default cruItemSchema;
