import * as yup from "yup";

const cruCustomerSchema = yup.object({
  nicNo: yup.string().required("Please enter customer NIC number"),
  firstName: yup.string().required("Please enter first name"),
  lastName: yup.string().required("Please enter last name"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please enter customer's email"),
  mobileNo: yup.string().required("Please enter customer's mobile number"),
  addressLine1: yup.string().required("Please enter customer's address"),
  addressLine2: yup.string(),
  addressLine3: yup.string(),
  city: yup.string().required("Please enter city"),
  postalCode: yup.string(),
});

export default cruCustomerSchema;
