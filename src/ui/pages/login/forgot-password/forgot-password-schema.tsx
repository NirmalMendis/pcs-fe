import * as yup from "yup";

const forgotPwdSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please enter your email."),
});

export default forgotPwdSchema;
