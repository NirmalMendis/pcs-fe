import * as yup from "yup";
import {
  MOBILE_REGEX_WITHOUT_COUNTRY_CODE,
  NICNO_REGEX,
} from "../../../constants/generic-constants";

const cruCustomerSchema = yup.object({
  nicNo: yup
    .string()
    .matches(NICNO_REGEX, "Invalid NIC number")
    .required("Please enter customer NIC number"),
  firstName: yup.string().required("Please enter first name"),
  lastName: yup.string().required("Please enter last name"),
  email: yup.string().email("Invalid email address"),
  mobileNo: yup
    .string()
    .matches(MOBILE_REGEX_WITHOUT_COUNTRY_CODE, "Invalid Mobile number")
    .required("Please enter customer's mobile number"),
  addressLine1: yup.string().required("Please enter customer's address"),
  addressLine2: yup.string(),
  addressLine3: yup.string(),
  city: yup.string().required("Please enter city"),
  postalCode: yup.string(),
});

export default cruCustomerSchema;
