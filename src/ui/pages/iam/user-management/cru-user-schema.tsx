import * as yup from "yup";
import { MOBILE_REGEX } from "../../../../constants/generic-constants";

const cruUserSchema = yup.object({
  firstName: yup.string().required("Please enter first name"),
  lastName: yup.string().required("Please enter last name"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please enter customer's email"),
  mobileNo: yup
    .string()
    .matches(MOBILE_REGEX, "Invalid Mobile number")
    .required("Please enter customer's mobile number"),
  roles: yup
    .array()
    .of(yup.number())
    .min(1)
    .required("Please select user roles"),
  branches: yup
    .array()
    .of(yup.number())
    .min(1)
    .required("Please select user's branches"),
});

export default cruUserSchema;
